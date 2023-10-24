package com.s001.cocotaxi.repository;

import com.s001.cocotaxi.domain.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallRepository extends JpaRepository<Call, Integer> {
}
