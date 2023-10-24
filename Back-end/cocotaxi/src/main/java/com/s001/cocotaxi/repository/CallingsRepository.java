package com.s001.cocotaxi.repository;
import com.s001.cocotaxi.domain.Callings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallingsRepository extends JpaRepository<Callings, Integer> {
}
