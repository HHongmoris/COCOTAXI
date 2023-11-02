package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.CallingsResponse;
import com.s001.cocotaxi.repository.CallRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static java.util.Collections.sort;

@Slf4j
@Service
@RequiredArgsConstructor
public class CallingsServiceImpl implements CallingsService {
    private final CallRepository callRepository;

    @Override
    public List<CallingsResponse> getAllCallings() {
        List<Callings> callings = callRepository.findAll();
        List<CallingsResponse> resultAllCallings = new ArrayList<>();

        for(Callings call : callings) {
            if(call.getCallStatus().equals("call")){
                CallingsResponse response = new CallingsResponse();
                response.callingsResponseList(call);
                resultAllCallings.add(response);
            }
        }

        Comparator<CallingsResponse> comparator = (response1, response2) -> response1.getCallCreatedTime().compareTo(response2.getCallCreatedTime());
        sort(resultAllCallings,comparator);

        return resultAllCallings;
    }

}
