package com.s001.cocotaxi.repository;

import com.s001.cocotaxi.domain.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {

    @Query("SELECT d FROM Driver d WHERE (d.driverLatitude BETWEEN :minY AND  :maxY) AND (d.driverLongitude BETWEEN :minX AND :maxX) AND d.vehicleType = :vehicleType")
    List<Driver> findDriverByDriverLatitudeAndDriverLongitude(@Param("maxX") double maxX, @Param("minX") double minX, @Param("maxY") double maxY, @Param("minY") double minY, @Param("vehicleType") String vehicleType);
}
