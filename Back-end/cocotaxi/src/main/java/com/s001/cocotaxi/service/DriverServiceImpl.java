package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.AllDriverResponse;
import com.s001.cocotaxi.dto.response.DriverDetailResponse;
import com.s001.cocotaxi.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService{
    private final DriverRepository driverRepository;
    @Override
    public List<AllDriverResponse> selectAllDrivers() {
        List<AllDriverResponse> list = driverRepository.findAll().stream().map(AllDriverResponse::new).collect(
                Collectors.toList());
        List<AllDriverResponse> allDrivers = new ArrayList<>();

        for(int idx = 0; idx < list.size(); idx++){
            allDrivers.add(list.get(idx));
        }
        return allDrivers;

    }

    @Override
    public DriverDetailResponse selectDriverDetail(int driverId) {
        Driver driver = driverRepository.findById(driverId).get();

        DriverDetailResponse driverDetail = new DriverDetailResponse();
        driverDetail.DriverDetailResponse(driver);

        return driverDetail;
    }
}
