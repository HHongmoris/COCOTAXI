package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.response.CallingDetailResponse;
import com.s001.cocotaxi.dto.response.CallingsResponse;
import com.s001.cocotaxi.service.CallingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/callings")
public class CallingsController {

    private final CallingsService callingsService;

    @GetMapping
    public ResponseEntity<List<CallingsResponse>> getCallingsList(){
        List<CallingsResponse> callingsListResponses = callingsService.getAllCallings();

        return ResponseEntity.status(HttpStatus.OK).body(callingsListResponses);
    }

    @GetMapping("/{callId}")
    public ResponseEntity<CallingDetailResponse> getCallingDetail(@PathVariable("callId") int callId){
        CallingDetailResponse response = callingsService.getCallingDetail(callId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
