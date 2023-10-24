package com.s001.cocotaxi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Callings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Callings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "callId", nullable = false)
    private int callId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientId")
    private Client client;

    @Column(name = "callStatus")
    private String callStatus;

    @Column(name = "callCreatedTime")
    private Timestamp callCreatedTime;

    @Column(name = "startPointLatitude")
    private double startPointLatitude;

    @Column(name = "startPointLongitude")
    private double startPointLongitude;

    @Column(name = "endPointLatitude")
    private double endPointLatitude;

    @Column(name = "endPointLongitude")
    private double endPointLongitude;

    @Column(name = "vehicleType")
    private String vehicleType;

}
