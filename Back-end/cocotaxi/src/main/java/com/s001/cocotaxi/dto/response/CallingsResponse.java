package com.s001.cocotaxi.dto.response;

import com.s001.cocotaxi.domain.Callings;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CallingsResponse implements Comparable<CallingsResponse> {
    // Fields, Getters, Setters 생략
    private int callId;
    private Timestamp callCreatedTime;
    private String vehicleType;
    private double startPointLatitude;
    private double endPointLatitude;
    private double startPointLongitude;
    private double endPointLongitude;
    private String distance;
    private String pickUpLocation;
    private String dropOffLocation;
    private String realTime;
    private String lineColor;

    public void callingsResponseList(Callings entity){
        this.callId = entity.getCallId();
        this.callCreatedTime = entity.getCallCreatedTime();
        this.vehicleType = entity.getVehicleType();
        this.startPointLongitude = entity.getStartPointLongitude();
        this.startPointLatitude = entity.getStartPointLatitude();
        this.endPointLongitude = entity.getEndPointLongitude();
        this.endPointLatitude = entity.getEndPointLatitude();
        this.pickUpLocation = entity.getPickUpLocation();
        this.dropOffLocation = entity.getDropOffLocation();
        this.realTime = entity.getRealTime();
        this.lineColor = entity.getLineColor();
    }

    @Override
    public int compareTo(CallingsResponse o) {
        return (int)(o.callCreatedTime.getTime() - this.callCreatedTime.getTime());
    }
}
