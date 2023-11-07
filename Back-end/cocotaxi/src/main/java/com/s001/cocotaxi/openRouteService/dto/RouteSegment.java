package com.s001.cocotaxi.openRouteService.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RouteSegment {
    private double distance;
    private double duration;
    private List<RouteStep> steps;
}
