package com.s001.cocotaxi.openRouteService.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RouteStep {
    private double distance;
    private double duration;
    private String instruction;
    private String name;
    private List<Double> way_points;
}
