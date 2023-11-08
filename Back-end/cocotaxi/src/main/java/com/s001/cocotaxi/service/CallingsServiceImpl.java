package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Client;
import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.CallingDetailResponse;
import com.s001.cocotaxi.dto.response.CallingsResponse;
import com.s001.cocotaxi.openRouteService.dto.RouteSummary;
import com.s001.cocotaxi.openRouteService.service.OpenRouteService;
import com.s001.cocotaxi.repository.CallRepository;
import com.s001.cocotaxi.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ClientRepository clientRepository;
    private final OpenRouteService openRouteService;

    @Override
    public List<CallingsResponse> getAllCallings() {
        List<Callings> callings = callRepository.findAll();
        List<CallingsResponse> resultAllCallings = new ArrayList<>();

        for(Callings call : callings) {
            if(call.getCallStatus().equals("call")){
                CallingsResponse response = new CallingsResponse();
                //만약 실제 거리와 이동 시간 안나오면 이 로직으로 경로, 시간 넣을 수 있게
                if(call.getDistance()==null || call.getRealTime() == null){
                    String start = String.valueOf(call.getStartPointLongitude()) + "," + String.valueOf(call.getStartPointLatitude());
                    String end = String.valueOf(call.getEndPointLongitude()) + "," + String.valueOf(call.getEndPointLatitude());
                    RouteSummary summary = openRouteService.getSummary(start, end);
                    Double distance = (double) (Math.round(((summary.getDistance())*0.001)*100))/100;
                    int duration = (int) ((summary.getDuration())/60);
                    String realTime = duration +"min";
                    call.setDistance(distance);
                    call.setRealTime(realTime);
                    callRepository.save(call);
                }

                String result = call.getDistance() +"km";
                response.callingsResponseList(call);
                response.setDistance(result);

                resultAllCallings.add(response);
            }
        }

        Comparator<CallingsResponse> comparator = (response1, response2) -> response1.getCallCreatedTime().compareTo(response2.getCallCreatedTime());
        sort(resultAllCallings,comparator);

        return resultAllCallings;
    }


    @Override
    @Transactional(readOnly = true)
    public CallingDetailResponse getCallingDetail(int callId) {
        Callings calling = callRepository.findById(callId).get();
        CallingDetailResponse callingDetailResponse = new CallingDetailResponse();
        callingDetailResponse.callingDetail(calling);

        return callingDetailResponse;
    }

}
