package com.s001.cocotaxi.repository;

import com.s001.cocotaxi.domain.Driver;
import com.s001.cocotaxi.dto.response.DispatchListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    @Query("SELECT d FROM Driver d WHERE d.driverLatitude > :minY AND d.driverLatitude < :maxY AND d.driverLongitude > :minX AND d.driverLongitude < :maxX")
    List<Driver> getAroundDriver(@Param("maxX") double maxX, @Param("minX") double minX, @Param("maxY") double maxY, @Param("minY") double minY);

}
