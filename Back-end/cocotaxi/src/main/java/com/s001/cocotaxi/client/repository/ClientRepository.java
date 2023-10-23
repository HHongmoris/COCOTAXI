package com.s001.cocotaxi.client.repository;

import com.s001.cocotaxi.client.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
