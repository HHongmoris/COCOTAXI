package com.s001.cocotaxi.repository;

import com.s001.cocotaxi.domain.Dispatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DispatchRepository extends JpaRepository<Dispatch, Integer> {
}
