package com.s001.cocotaxi.dto.response;


import com.s001.cocotaxi.domain.Driver;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DispatchListResponse {
    private int driverId;
    private String driverName;
    private String vehicleNo;
    private String vehicleType;

    //TODO: 일단 int로 했는데 string이나 double로 바꿀수도 있음
    private double distance;

    //TODO : 이거 나중에 따로 api 뺴서 하든 어찌하든 필요
    private double driverLongitude;
    private double driverLatitude;


    public DispatchListResponse(Driver entity){
        this.driverId = entity.getDriverId();
        this.driverName = entity.getDriverName();
        this.vehicleNo = entity.getVehicleNo();
        this.vehicleType = entity.getVehicleType();
        this.driverLongitude = entity.getDriverLongitude();
        this.driverLatitude = entity.getDriverLatitude();
    }
}
