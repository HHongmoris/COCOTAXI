package com.s001.cocotaxi.domain;

import com.s001.cocotaxi.controller.DriverController;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Driver")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    //기사 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driverId", nullable = false)
    private int driverId;

    //기사 이름
    @Column(name="driverName")
    private String driverName;

    //차량 종류
    @Column(name="vehicleType")
    private String vehicleType;

    //차량등록번호
    @Column(name="vehicleNo")
    private String vehicleNo;

    //배차여부
    @Column(name = "isVehicleMatched")
    private boolean isVehicleMatched;

    //기사위치 위도
    @Column(name = "driverLatitude")
    private double driverLatitude;

    //기사위치 경도
    @Column(name = "driverLongitude")
    private double driverLongitude;

}
