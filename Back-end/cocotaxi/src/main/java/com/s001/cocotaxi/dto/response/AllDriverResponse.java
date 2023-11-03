package com.s001.cocotaxi.dto.response;

import com.s001.cocotaxi.domain.Driver;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AllDriverResponse {
    private int driverId;
    private String driverName;
    private String vehicleType;
    private double driverLongitude;
    private double driverLatitude;

    public AllDriverResponse(Driver entity){
        this.driverId = entity.getDriverId();
        this.driverName = entity.getDriverName();
        this.vehicleType = entity.getVehicleType();
        this.driverLongitude = entity.getDriverLongitude();
        this.driverLatitude = entity.getDriverLatitude();
    }

}
