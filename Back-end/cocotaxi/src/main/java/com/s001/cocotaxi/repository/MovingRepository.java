package com.s001.cocotaxi.repository;

import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.domain.DriverMoving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovingRepository extends JpaRepository<DriverMoving, Integer> {

    @Query("SELECT d FROM DriverMoving d WHERE d.driver.driverId = :driverId AND d.movingCount = :movingCount")
    DriverMoving findByDriverAndMovingCount(@Param("driverId") int driverId, @Param("movingCount") int movingCount);
}
