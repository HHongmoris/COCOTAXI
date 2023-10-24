package com.s001.cocotaxi.repository;

import com.s001.cocotaxi.domain.Calling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallRepository extends JpaRepository<Calling, Integer> {
}
