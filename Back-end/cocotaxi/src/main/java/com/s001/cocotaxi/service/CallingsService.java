package com.s001.cocotaxi.service;

import com.s001.cocotaxi.dto.response.CallingsResponse;

import java.util.List;

public interface CallingsService {

    List<CallingsResponse> getAllCallings();
}
