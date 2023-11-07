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
import java.util.Collections;
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
    private final MovingService movingService;

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

        //사용자가 호출한 차량 종류
        String vehicleType = callings.getVehicleType();

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
        double maxX = userLongitude -(RANGE_DISTANCE* kmForLongitude);
        double minX = userLongitude +(RANGE_DISTANCE* kmForLongitude);

        List<Driver> tempAroundDriverList = new ArrayList<Driver>();

        //vehicleType별로 분류
        if(vehicleType.equals("car")){  //car 일 때
            //해당되는 좌표의 범위 안에 있는 택시
            tempAroundDriverList = driverRepository.findCarDriverByDriverLatitudeAndDriverLongitude(maxX, minX, maxY, minY);
        }else { //tuktuk 일 때
            //해당되는 좌표의 범위 안에 있는 택시
            tempAroundDriverList = driverRepository.findTuktukDriverByDriverLatitudeAndDriverLongitude(maxX, minX, maxY, minY);
        }

        List<DispatchListResponse>resultAroundDriverList = new ArrayList<>();

        //정확한 거리 측정 -> 범위 반경보다 작으면 반올림해서 표시
        for(Driver aroundDriver : tempAroundDriverList) {

            double distance = getDistance(userLatitude, userLongitude, aroundDriver.getDriverLatitude(), aroundDriver.getDriverLongitude());
            boolean flag = aroundDriver.getIsVehicleMatched();

            if(distance < RANGE_DISTANCE && !flag){ // 6km 보다 작고 손님 없는 경우만
                DispatchListResponse response = new DispatchListResponse();
                response.DispatchListResponse(aroundDriver);
                response.setDistance((double)Math.round(distance*1000)/1000);

                if(aroundDriver.getDriverId()==1){
                    //TODO: 일정시간마다 차 위치 변경되게 로직 테스트
                    List<Double> location = movingService.updateDriverLocation(aroundDriver.getDriverId());
                    response.setDriverLatitude(location.get(0));
                    response.setDriverLongitude(location.get(1));
                }

                resultAroundDriverList.add(response);
            }
        }

        Collections.sort(resultAroundDriverList, (driver1, driver2) -> Double.compare(driver1.getDistance(), driver2.getDistance()));

        return resultAroundDriverList;
    }

    //배차 진행 로직
    @Override
    public Dispatch makeDispatch(int callId, int driverId) {
        Callings callings = callRepository.findById(callId).orElseThrow();
        Driver driver = driverRepository.findById(driverId).orElseThrow();
        Client client = clientRepository.findById(callings.getClient().getClientId()).orElseThrow();
        //Dispatch 레코드 추가
        Dispatch dispatch = new Dispatch();
        dispatch.setCallings(callings);
        dispatch.setDriver(driver);
        dispatch.setClient(client);
        dispatch.setDispatchState("on_board");
        dispatchRepository.save(dispatch);

        //driver에서 isVehicleMatched true로 변환(빈차->운행중)
        driver.setIsVehicleMatched(true);
        System.out.println("이거 봐 : "+ driver.getIsVehicleMatched());
        driverRepository.save(driver);

        //callings에서 호출 성공으로 call에서 on_board로 변경
        callings.setCallStatus("on_board");
        callRepository.save(callings);

        return dispatch;
    }
}
