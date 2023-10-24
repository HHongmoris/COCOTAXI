package com.s001.cocotaxi.dto;

import com.s001.cocotaxi.domain.Callings;
import com.s001.cocotaxi.domain.Client;

import java.sql.Timestamp;

public class CallingsResponse {

    private final int callId;
    private final Client client;
    private final String callStatus;
    private final Timestamp callCreatedTime;
    private final double startPointLatitude;
    private final double startPointLongitude;
    private final double endPointLongitude;
    private final double endPointLatitude;
    private final String vehicleType;

    public CallingsResponse(Callings callings) {
        this.callId = callings.getCallId();
        this.client = callings.getClient();
        this.callStatus = callings.getCallStatus();
        this.callCreatedTime = callings.getCallCreatedTime();
        this.startPointLatitude = callings.getStartPointLatitude();
        this.startPointLongitude = callings.getStartPointLongitude();
        this.endPointLongitude = callings.getEndPointLongitude();
        this.endPointLatitude = callings.getEndPointLatitude();
        this.vehicleType = callings.getVehicleType();
    }

}
