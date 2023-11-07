package com.s001.cocotaxi.openRouteService.controller;

import com.s001.cocotaxi.openRouteService.dto.RouteSummary;
import com.s001.cocotaxi.openRouteService.service.OpenRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/route")
public class RouteController {
    private final OpenRouteService openRouteService;


    @GetMapping("/getRoute")
    public ResponseEntity<List<List<Double>>> getRoute(@RequestParam String start, @RequestParam String end) {
        List<List<Double>> coordinate = openRouteService.getRoute(start, end);

        return ResponseEntity.status(HttpStatus.OK).body(coordinate);
    }

    @GetMapping("/getSummary")
    public ResponseEntity<RouteSummary> getSummary(@RequestParam String start, @RequestParam String end) {
        RouteSummary summary = openRouteService.getSummary(start, end);

        return ResponseEntity.status(HttpStatus.OK).body(summary);
    }

    @GetMapping("/getDistance")
    public ResponseEntity<String> getDistance(@RequestParam String start, @RequestParam String end) {
        RouteSummary summary = openRouteService.getSummary(start, end);
        Double distance = (summary.getDistance())*0.001;
        String  result = String.valueOf((double) (Math.round(distance*100))/100)+"km";
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/getDuration")
    public ResponseEntity<String> getDuration(@RequestParam String start, @RequestParam String end) {
        RouteSummary summary = openRouteService.getSummary(start, end);
        double duration = (summary.getDuration())/60;
        String  result = String.valueOf((double) (Math.round(duration*100))/100)+"min";
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
