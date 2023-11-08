package com.s001.cocotaxi.dto.response;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Client;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CallingDetailResponse {
    private int callId;
    private Timestamp callCreatedTime;
    private String clientName;
    private String vehicleType;
    private double startPointLatitude;
    private double endPointLatitude;
    private double startPointLongitude;
    private double endPointLongitude;
    private double distance;
    private String pickUpLocation;
    private String dropOffLocation;
    private String realTime;

    public void callingDetail(Callings callings){
        this.callId = callings.getCallId();
        this.callCreatedTime = callings.getCallCreatedTime();
        this.clientName = callings.getClient().getClientName();
        this.vehicleType = callings.getVehicleType();
        this.startPointLongitude = callings.getStartPointLongitude();
        this.startPointLatitude = callings.getStartPointLatitude();
        this.endPointLongitude = callings.getEndPointLongitude();
        this.endPointLatitude = callings.getEndPointLatitude();
        this.distance = callings.getDistance();
        this.pickUpLocation = callings.getPickUpLocation();
        this.dropOffLocation = callings.getDropOffLocation();
        this.realTime = callings.getRealTime();
    }
}
