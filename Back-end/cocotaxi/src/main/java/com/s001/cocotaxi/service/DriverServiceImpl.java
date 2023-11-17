package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.AllDriverResponse;
import com.s001.cocotaxi.dto.response.DriverDetailResponse;
import com.s001.cocotaxi.repository.DriverRepository;
import com.s001.cocotaxi.sse.DTO.Location;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService{
    private final DriverRepository driverRepository;
    private final MovingService movingService;

//    @Override
//    public List<AllDriverResponse> selectAllDrivers() {
//        List<AllDriverResponse> list = driverRepository.findAll().stream().map(AllDriverResponse::new).collect(
//                Collectors.toList());
    //이거 중복된 코드라 없어도 될 듯
//        List<AllDriverResponse> allDrivers = new ArrayList<>();
//
//        for(int idx = 0; idx < list.size(); idx++){
//            allDrivers.add(list.get(idx));
//        }
//        return allDrivers;
//
//    }

//    //TODO : 실시간 이동 적용
//    @Override
//    public List<AllDriverResponse> selectAllDrivers() {
//        List<AllDriverResponse> list = driverRepository.findAll().stream().map(AllDriverResponse::new).collect(
//                Collectors.toList());
//        List<AllDriverResponse> allDrivers = new ArrayList<>();
//
//        for (AllDriverResponse allDriverResponse : list) {
//            AllDriverResponse response = new AllDriverResponse();
//            response = allDriverResponse;
//            List<Double> location = movingService.updateDriverLocation(response.getDriverId());
//            response.setDriverLatitude(location.get(0));
//            response.setDriverLongitude(location.get(1));
//            allDrivers.add(response);
//        }
//        return allDrivers;
//
//    }


    //TODO : 실시간 이동 적용 -> movingCount 오류 수정 중
    @Override
    public List<AllDriverResponse> selectAllDrivers() {
        List<AllDriverResponse> list = driverRepository.findAll().stream().map(AllDriverResponse::new).collect(
                Collectors.toList());
        List<AllDriverResponse> allDrivers = new ArrayList<>();
        List<Location> locationList = movingService.updateDriverLocationList();

        for (int i=0; i<list.size(); i++) {
            AllDriverResponse response = new AllDriverResponse();
            response = list.get(i);
            response.setDriverLatitude(locationList.get(i).getDriverLatitude());
            response.setDriverLongitude(locationList.get(i).getDriverLongitude());
            allDrivers.add(response);
        }
        return allDrivers;

    }

    @Override
    public DriverDetailResponse selectDriverDetail(int driverId) {
        Driver driver = driverRepository.findById(driverId).get();
        DriverDetailResponse driverDetail = new DriverDetailResponse();

//        //TODO: 실시간 차량 이동 좌표 로직
//        List<Double> location = movingService.updateDriverLocation(driver.getDriverId());
//        driverDetail.setDriverLatitude(location.get(0));
//        driverDetail.setDriverLongitude(location.get(1));
        driverDetail.DriverDetailResponse(driver);

        return driverDetail;
    }
}
