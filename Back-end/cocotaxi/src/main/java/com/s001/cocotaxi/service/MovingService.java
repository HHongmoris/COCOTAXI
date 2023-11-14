package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.DriverMoving;
import com.s001.cocotaxi.repository.DriverRepository;
import com.s001.cocotaxi.repository.MovingRepository;
import com.s001.cocotaxi.sse.DTO.Location;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovingService {
    private final MovingRepository movingRepository;
    private final DriverRepository driverRepository;
    private int movingCount = 0; // 초기값 0

    @Scheduled(fixedRate = 1000)    //1초(1000밀리초)
    public List<Double> updateDriverLocation(int driverId){
        // 0과 1을 번갈아가며 변경
        movingCount = movingCount%11;
        DriverMoving driverMoving = movingRepository.findByDriverAndMovingCount(driverId, movingCount);

        // 변경된 위치 정보 리스트를 반환합니다.
        List<Double> locationList = new ArrayList<>();
        locationList.add(driverMoving.getDriverLatitude());
        locationList.add(driverMoving.getDriverLongitude());

        if (driverId==1){
            System.out.println("여기 "+movingCount);
        }
        System.out.println("movingCount : "+movingCount);
        System.out.println("driverID : "+driverId);
        movingCount++;
        // 위치 정보 리스트를 반환합니다.
        return locationList;
    }


    // movingCount 오류 수정 버전
    @Scheduled(fixedRate =2000)    //1초(1000밀리초)
    public List<Location> updateDriverLocationList(){
        // 0~10을 순서대로 변경
        movingCount = movingCount%11;

        List<Location> locationList = new ArrayList<>();

        int number = (int) driverRepository.count();

        for(int i=0; i<number; i++){
            int driverId = i+1;
            DriverMoving driverMoving = movingRepository.findByDriverAndMovingCount(driverId, movingCount);
            Location location = new Location();
            location.setDriverId(driverId);
            location.setDriverLatitude(driverMoving.getDriverLatitude());
            location.setDriverLongitude(driverMoving.getDriverLongitude());
            locationList.add(location);
        }
        movingCount++;

        return locationList;
    }
}
