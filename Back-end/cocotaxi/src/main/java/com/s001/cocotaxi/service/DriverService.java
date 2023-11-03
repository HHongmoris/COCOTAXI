package com.s001.cocotaxi.service;

import com.s001.cocotaxi.dto.response.AllDriverResponse;
import com.s001.cocotaxi.dto.response.DriverDetailResponse;

import java.util.List;

public interface DriverService {
    // 모든 driver 조회
    List<AllDriverResponse> selectAllDrivers();

    DriverDetailResponse selectDriverDetail(int driverId);



}
