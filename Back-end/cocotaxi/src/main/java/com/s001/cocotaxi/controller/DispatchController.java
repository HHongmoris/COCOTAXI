package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.request.DispatchListRequest;
import com.s001.cocotaxi.dto.response.DispatchListResponse;
import com.s001.cocotaxi.service.DispatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/dispatch")
public class DispatchController {
    private final DispatchService dispatchService;

    //배차 후보 리스트 조회
    @GetMapping
    public ResponseEntity<List<DispatchListResponse>> getDispatchDriverList(@RequestBody int callId){
        List<DispatchListResponse> dispatchListResponses = dispatchService.getDispatchList(callId);

        return ResponseEntity.status(HttpStatus.OK).body(dispatchListResponses);
    }
}
