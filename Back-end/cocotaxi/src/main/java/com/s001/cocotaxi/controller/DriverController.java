package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.dto.response.AllDriverResponse;
import com.s001.cocotaxi.dto.response.DriverDetailResponse;
import com.s001.cocotaxi.service.DriverService;
import com.s001.cocotaxi.sse.sseemitter.SseEmitters;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverService driverService;

    // SSE
    private final SseEmitters sseEmitters;

//    @GetMapping
//    public ResponseEntity<List<AllDriverResponse>> getDriverList() {
//        List<AllDriverResponse> driverList = driverService.selectAllDrivers();
//
//        return ResponseEntity.status(HttpStatus.OK).body(driverList);
//    }

    //SSE 이식
//    @GetMapping
//    public ResponseEntity<SseEmitter> getDriverList() {
//        //timeout 시간 설정
//        SseEmitter emitter = new SseEmitter(-1L);
//        sseEmitters.add(emitter);
//
//        try {
//            List<AllDriverResponse> driverList = driverService.selectAllDrivers();
//
//            //이 네임이 프론트에서 이 에미터를 실행시켜주는
//            emitter.send(SseEmitter.event().name("allDrivers").data(driverList));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(emitter);
//    }

    //SSE 테스트 2 -> 보다 직접적으로 데이터 전송 로직
    @GetMapping
    public ResponseEntity<SseEmitter> getDriverList() {
        SseEmitter emitter = new SseEmitter(-1L);
        sseEmitters.add(emitter);

        // 주기적으로 최신 좌표를 가져와서 클라이언트에게 전송
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.scheduleAtFixedRate(() -> {
            try {
                List<AllDriverResponse> driverList = driverService.selectAllDrivers();
                emitter.send(SseEmitter.event().name("allDrivers").data(driverList));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }, 0, 3, TimeUnit.SECONDS);

        return ResponseEntity.status(HttpStatus.OK).body(emitter);
    }




    @GetMapping("/{driverId}")
    public ResponseEntity<DriverDetailResponse> getDriverDetail(@PathVariable("driverId") int driverId) {
        DriverDetailResponse response = driverService.selectDriverDetail(driverId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
