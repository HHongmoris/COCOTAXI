package com.s001.cocotaxi.openRouteService.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RouteAddressResponse {
    private List<RouteAddressFeature> features;

}
