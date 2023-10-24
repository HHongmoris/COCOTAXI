package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.CallingsResponse;
import com.s001.cocotaxi.service.CallingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController

public class callingsController {

    private final CallingsService callingsService;

    @GetMapping("/api/callings")
    public ResponseEntity<List<CallingsResponse>> findAllCallings() {
        List<CallingsResponse> callingS = callingsService.findAll()
                .stream()
                .map(CallingsResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(callingS);
    }

}
