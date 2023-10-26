package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.response.CallingsResponse;
import com.s001.cocotaxi.service.CallingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CallingsController {

    private final CallingsService callingsService;

    @GetMapping("/api/callings")
    public ResponseEntity<List<CallingsResponse>> getCallingsList(){
        List<CallingsResponse> callingsListResponses = callingsService.getAllCallings();

        return ResponseEntity.status(HttpStatus.OK).body(callingsListResponses);
    }
}
