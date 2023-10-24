package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.repository.CallingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service

public class CallingsService {

    private final CallingsRepository callingsRepository;

    public List<Callings> findAll(){
        return callingsRepository.findAll();
    }

}
