package com.s001.cocotaxi.openRouteService.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CoordinateResponse {

    private List<List<Double>> coordinate;
}
