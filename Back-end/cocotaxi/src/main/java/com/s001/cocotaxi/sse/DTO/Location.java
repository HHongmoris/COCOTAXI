package com.s001.cocotaxi.sse.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Location {
    private int driverId;
    private double driverLongitude;
    private double driverLatitude;
}
