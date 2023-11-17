package com.s001.cocotaxi.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DispatchRequest {

    private int dispatchId;
    private int callId;
    private String clientName;
    private int driverId;
    private String driverName;
    private String vehicleNo;

}
