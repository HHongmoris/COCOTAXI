package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Dispatch;
import com.s001.cocotaxi.dto.response.CallAndDriverResponse;
import com.s001.cocotaxi.dto.response.DispatchListResponse;

import java.util.List;

public interface DispatchService {
    //차량 후보 리스트 조회
    List<DispatchListResponse> getDispatchList(int callId);

    //강제 배차
    Dispatch makeDispatch(int callId, int driverId);

    //손님과 차량 사이의 실제 경로 거리와 소요 시간 로직
    CallAndDriverResponse getDistanceAndRealTime(int callId, int driverId);

}
