package com.s001.cocotaxi.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "drivermoving")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverMoving {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_moving_id", nullable = false)
    private int driverMovingId;

    //기사 이름
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_name")
    private Driver driver;

    //기사위치 위도
    @Column(name = "driver_latitude")
    private double driverLatitude;

    //기사위치 경도
    @Column(name = "driver_longitude")
    private double driverLongitude;

    //변경 좌표
    @Column(name = "moving_count")
    private int movingCount;
}
