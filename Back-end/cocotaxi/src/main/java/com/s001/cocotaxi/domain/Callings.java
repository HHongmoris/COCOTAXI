package com.s001.cocotaxi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "callings")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Callings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "call_id", nullable = false)
    private int callId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "call_status")
    private String callStatus;

    @Column(name = "call_createdTime")
    private Timestamp callCreatedTime;

    @Column(name = "start_point_latitude")
    private double startPointLatitude;

    @Column(name = "start_point_longitude")
    private double startPointLongitude;

    @Column(name = "end_point_latitude")
    private double endPointLatitude;

    @Column(name = "end_point_longitude")
    private double endPointLongitude;

    @Column(name = "vehicle_type")
    private String vehicleType;

}
