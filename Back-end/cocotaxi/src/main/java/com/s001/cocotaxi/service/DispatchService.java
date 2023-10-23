package com.s001.cocotaxi.service;

import com.s001.cocotaxi.dto.request.DispatchListRequest;
import com.s001.cocotaxi.dto.response.DispatchListResponse;

import java.util.List;

public interface DispatchService {
    //차량 후보 리스트 조회
    List<DispatchListResponse> getDispatchList(int callId);

    //강제 배차


}
