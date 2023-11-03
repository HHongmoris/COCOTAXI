package com.s001.cocotaxi.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "driver")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    //기사 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id", nullable = false)
    private int driverId;

    //기사 이름
    @Column(name="driver_name")
    private String driverName;

    //차량 종류
    @Column(name="vehicle_type")
    private String vehicleType;

    //차량등록번호
    @Column(name="vehicle_no")
    private String vehicleNo;

    //배차여부
    @Column(name = "is_vehicle_matched")
    private Boolean isVehicleMatched;

    //기사위치 위도
    @Column(name = "driver_latitude")
    private double driverLatitude;

    //기사위치 경도
    @Column(name = "driver_longitude")
    private double driverLongitude;

    //기사 평점
    @Column(name = "grade")
    private double grade;

    //기사 전화번호
    @Column(name = "driver_phone_no")
    private String driverPhoneNo;

}
