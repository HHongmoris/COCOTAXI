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
    private int distance;

    public DispatchListResponse(Driver entity){
        this.driverName = entity.getDriverName();
        this.vehicleNo = entity.getVehicleNo();
    }
}
