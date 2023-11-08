package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.CallingsResponse;
import com.s001.cocotaxi.openRouteService.dto.RouteSummary;
import com.s001.cocotaxi.openRouteService.service.OpenRouteService;
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
                    Double distance = (summary.getDistance())*0.001;
//                    String  result = String.valueOf((double) (Math.round(distance*100))/100)+"km";
                    double duration = (summary.getDuration())/60;
                    String realTime = String.valueOf((double) (Math.round(duration*100))/100)+"min";
                    call.setDistance(distance);
                    call.setRealTime(realTime);
                    callRepository.save(call);
                }

                response.callingsResponseList(call);

                resultAllCallings.add(response);
            }
        }

        Comparator<CallingsResponse> comparator = (response1, response2) -> response1.getCallCreatedTime().compareTo(response2.getCallCreatedTime());
        sort(resultAllCallings,comparator);

        return resultAllCallings;
    }

}
