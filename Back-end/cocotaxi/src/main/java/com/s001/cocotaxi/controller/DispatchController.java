package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.domain.Dispatch;
import com.s001.cocotaxi.dto.request.DispatchRequest;
import com.s001.cocotaxi.dto.response.CallAndDriverResponse;
import com.s001.cocotaxi.dto.response.DispatchListResponse;
import com.s001.cocotaxi.service.DispatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/dispatch")
public class DispatchController {
    private final DispatchService dispatchService;

    //배차 후보 리스트 조회
    @GetMapping( "/{callId}")
    public ResponseEntity<List<DispatchListResponse>> getDispatchDriverList(@PathVariable("callId") int callId){
        List<DispatchListResponse> dispatchListResponses = dispatchService.getDispatchList(callId);

        return ResponseEntity.status(HttpStatus.OK).body(dispatchListResponses);
    }

    //배차 시스템
    @PostMapping
    public ResponseEntity<DispatchRequest> makeDispatch(@RequestParam(value = "callId") int callId, @RequestParam(value = "driverId") int driverId){
        DispatchRequest dispatchRequest = new DispatchRequest();
        dispatchRequest = dispatchService.makeDispatch(callId, driverId);

        return ResponseEntity.status(HttpStatus.CREATED).body(dispatchRequest);
    }


    @GetMapping
    public ResponseEntity<CallAndDriverResponse> getDistanceAndRealTime(@RequestParam(value = "callId") int callId, @RequestParam(value = "driverId") int driverId){
        CallAndDriverResponse response = dispatchService.getDistanceAndRealTime(callId, driverId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
