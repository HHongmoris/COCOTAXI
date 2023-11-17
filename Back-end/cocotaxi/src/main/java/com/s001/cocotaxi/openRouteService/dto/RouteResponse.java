package com.s001.cocotaxi.openRouteService.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RouteResponse {
//    private List<RouteFeature> features;
//    private RouteSummary summary;
    private List<RouteFeature> features;

    public List<RouteFeature> getFeatures() {
        return features;
    }

    public void setFeatures(List<RouteFeature> features) {
        this.features = features;
    }
}
