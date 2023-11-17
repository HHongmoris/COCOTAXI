package com.s001.cocotaxi.openRouteService.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RouteFeature {
//    private List<List<Double>> geometry;
//    private List<RouteSegment> segments;
    private RouteGeometry geometry;
    private RouteProperties properties;

    public RouteGeometry getGeometry() {
        return geometry;
    }

    public void setGeometry(RouteGeometry geometry) {
        this.geometry = geometry;
    }
}
