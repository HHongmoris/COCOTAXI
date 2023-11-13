package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.DriverMoving;
import com.s001.cocotaxi.repository.MovingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovingService {
    private final MovingRepository movingRepository;
    private int movingCount = 0; // 초기값 0

    @Scheduled(fixedRate = 2000)    //1초(1000밀리초)
    public List<Double> updateDriverLocation(int driverId){
        // 0과 1을 번갈아가며 변경
        movingCount = (movingCount == 0) ? 1 : 0;
        DriverMoving driverMoving = movingRepository.findByDriverAndMovingCount(driverId, movingCount);

        // 변경된 위치 정보 리스트를 반환합니다.
        List<Double> locationList = new ArrayList<>();
        locationList.add(driverMoving.getDriverLatitude());
        locationList.add(driverMoving.getDriverLongitude());

        if (driverId==1){
            System.out.println("여기 "+movingCount);
        }
        // 위치 정보 리스트를 반환합니다.
        return locationList;
    }
}
