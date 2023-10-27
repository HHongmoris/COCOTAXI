package com.s001.cocotaxi.dto.response;


import com.s001.cocotaxi.domain.Driver;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DispatchListResponse {
    private String driverName;
    private String vehicleNo;

    //TODO: 일단 int로 했는데 string이나 double로 바꿀수도 있음
    private double distance;

    //TODO : 이거 나중에 따로 api 뺴서 하든 어찌하든 필요
//    private double driverLongitude;
//    private double driverLatitude;


    public DispatchListResponse(Driver entity){
        this.driverName = entity.getDriverName();
        this.vehicleNo = entity.getVehicleNo();
    }
}
