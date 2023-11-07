package com.s001.cocotaxi.openRouteService.service;

import com.s001.cocotaxi.openRouteService.dto.RouteResponse;
import com.s001.cocotaxi.openRouteService.dto.RouteSummary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenRouteService {

    @Value("${openrouteservice.api.key}")
    private String apiKey;
    private static final String API_URL = "https://api.openrouteservice.org/v2/directions/driving-car";

    private final RestTemplate restTemplate;

    //경로 좌표 가져오기
    public List<List<Double>> getRoute(String start, String end) {
        String apiUrl = API_URL + "?api_key=" + apiKey + "&start=" + start+"&end="+end;
        RouteResponse routeResponse = restTemplate.getForObject(apiUrl, RouteResponse.class);

        List<List<Double>> coordinates = routeResponse.getFeatures().get(0).getGeometry().getCoordinates();
        return coordinates;
    }

    //경로 이동 시간 가져오기
    public RouteSummary getSummary(String start, String end) {
        String apiUrl = API_URL + "?api_key=" + apiKey + "&start=" + start+"&end="+end;
        RouteResponse routeResponse = restTemplate.getForObject(apiUrl, RouteResponse.class);

        RouteSummary summary = routeResponse.getFeatures().get(0).getProperties().getSummary();

        return summary;
    }

}
