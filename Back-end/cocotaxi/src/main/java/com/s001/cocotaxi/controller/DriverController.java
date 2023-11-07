package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.response.AllDriverResponse;
import com.s001.cocotaxi.dto.response.DriverDetailResponse;
import com.s001.cocotaxi.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverService driverService;

    @GetMapping
    public ResponseEntity<List<AllDriverResponse>> getDriverList() {
        List<AllDriverResponse> driverList = driverService.selectAllDrivers();

        return ResponseEntity.status(HttpStatus.OK).body(driverList);
    }

    @GetMapping("/{driverId}")
    public ResponseEntity<DriverDetailResponse> getDriverDetail(@PathVariable("driverId") int driverId) {
        DriverDetailResponse response = driverService.selectDriverDetail(driverId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
