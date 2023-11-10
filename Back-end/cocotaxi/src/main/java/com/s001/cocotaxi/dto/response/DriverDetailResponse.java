package com.s001.cocotaxi.dto.response;

import com.s001.cocotaxi.domain.Driver;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DriverDetailResponse {
    private int driverId;
    private String driverName;
    private String vehicleType;
    private double driverLongitude;
    private double driverLatitude;
    private String vehicleNo;
    private String grade;
    private String driverPhoneNo;

    public void DriverDetailResponse(Driver entity){
        this.driverId = entity.getDriverId();
        this.driverName = entity.getDriverName();
        this.vehicleType = entity.getVehicleType();
//        this.driverLongitude = entity.getDriverLongitude();
//        this.driverLatitude = entity.getDriverLatitude();
        this.vehicleNo = entity.getVehicleNo();
        this.grade = entity.getGrade();
        this.driverPhoneNo = entity.getDriverPhoneNo();
    }

}
