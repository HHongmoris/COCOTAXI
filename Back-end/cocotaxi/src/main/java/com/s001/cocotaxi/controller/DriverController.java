package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.response.AllDriverResponse;
import com.s001.cocotaxi.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverService driverService;

    @GetMapping
    public ResponseEntity<List<AllDriverResponse>> getMachineList() {
        List<AllDriverResponse> driverList = driverService.selectAllDrivers();

        return ResponseEntity.status(HttpStatus.OK).body(driverList);
    }

}
