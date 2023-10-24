package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Client;
import com.s001.cocotaxi.domain.Dispatch;
import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.DispatchListResponse;
import com.s001.cocotaxi.repository.CallRepository;
import com.s001.cocotaxi.repository.ClientRepository;
import com.s001.cocotaxi.repository.DispatchRepository;
import com.s001.cocotaxi.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DispatchServiceImpl implements DispatchService {
    private static final int EARTH_RADIUS = 6371; //지구 반지름
    private static final int RANGE_DISTANCE = 6; //강제배차 반경
    private final DispatchRepository dispatchRepository;
    private final ClientRepository clientRepository;
    private final CallRepository callRepository;
    private final DriverRepository driverRepository;

    //두 지점 사이의 거리 그하기
    public static double getDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat/2)* Math.sin(dLat/2)+ Math.cos(Math.toRadians(lat1))* Math.cos(Math.toRadians(lat2))* Math.sin(dLon/2)* Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double d = EARTH_RADIUS* c;    // Distance in km
        return d;
    }

    @Override
    public List<DispatchListResponse> getDispatchList(int callId) {
        //호출 번호에 맞는 위치에 따라 드라이버와 거리 비교 -> 6km 이내에 있다면 리스트에 추가
        Callings callings = callRepository.findById(callId).orElseThrow();
        //사용자 위도, 경도
        double userLatitude = callings.getStartPointLatitude();
        double userLongitude = callings.getStartPointLongitude();
        //km당 위도(y) 이동값
        double kmForLatitude =(1 /(EARTH_RADIUS* 1 *(Math.PI/ 180)));
        //km당 경도(x) 이동 값
        double kmForLongitude =(1 /(EARTH_RADIUS* 1 *(Math.PI/ 180)* Math.cos(Math.toRadians(userLongitude))));

        //현재 위치 기준 검색 거리 좌표
        double maxY = userLatitude +(RANGE_DISTANCE* kmForLatitude);
        double minY = userLatitude -(RANGE_DISTANCE* kmForLatitude);
        double maxX = userLongitude +(RANGE_DISTANCE* kmForLongitude);
        double minX = userLongitude -(RANGE_DISTANCE* kmForLongitude);

        //해당되는 좌표의 범위 안에 있는 택시
        //List<Driver>tempAroundDriverList = driverRepository.getAroundDriver(maxX, minX, maxY, minY);
        List<Driver>tempAroundDriverList = driverRepository.findAll();

        List<DispatchListResponse>resultAroundDriverList = new ArrayList<>();

        //정확한 거리 측정 -> 범위 반경보다 작으면 반올림해서 표시
        for(Driver aroundDriver : tempAroundDriverList) {
            double distance = getDistance(userLatitude, userLongitude, aroundDriver.getDriverLatitude(), aroundDriver.getDriverLongitude());
            if(distance < RANGE_DISTANCE){
                DispatchListResponse response = new DispatchListResponse();
                response.setDriverName(aroundDriver.getDriverName());
                response.setVehicleNo(aroundDriver.getVehicleNo());
                response.setDistance((int) Math.round(distance));
                resultAroundDriverList.add(response);
            }
        }

        return resultAroundDriverList;
    }

    //배차 진행 로직
    @Override
    public Dispatch makeDispatch(int callId, int driverId) {
        Callings callings = callRepository.findById(callId).orElseThrow();
        Driver driver = driverRepository.findById(driverId).orElseThrow();
        Client client = clientRepository.findById(Long.valueOf(callings.getClient().getClientId())).orElseThrow();

        Dispatch dispatch = new Dispatch();
        dispatch.setCallings(callings);
        dispatch.setDriver(driver);
        dispatch.setClient(client);

        dispatchRepository.save(dispatch);

        return dispatch;
    }
}
