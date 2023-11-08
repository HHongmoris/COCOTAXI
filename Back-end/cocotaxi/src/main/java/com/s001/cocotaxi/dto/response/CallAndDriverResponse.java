package com.s001.cocotaxi.dto.response;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Driver;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CallAndDriverResponse {
    private int callId;
    private double callStartLatitude;
    private double callStartLongitude;
    private int driverId;
    private String driverName;
    private String vehicleNo;
    private double driverLatitude;
    private double driverLongitude;
    private double distance;
    private String realTime;

    public CallAndDriverResponse(Callings callings, Driver driver){
        this.callId = callings.getCallId();
        this.callStartLatitude = callings.getStartPointLatitude();
        this.callStartLongitude = callings.getStartPointLongitude();
        this.driverId = driver.getDriverId();
        this.driverName = driver.getDriverName();
        this.vehicleNo = driver.getVehicleNo();
        this.driverLatitude = driver.getDriverLatitude();
        this.driverLongitude = driver.getDriverLongitude();
    }
}
