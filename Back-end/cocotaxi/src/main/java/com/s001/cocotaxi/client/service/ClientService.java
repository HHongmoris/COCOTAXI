package com.s001.cocotaxi.client.service;

import com.s001.cocotaxi.client.domain.Client;
import com.s001.cocotaxi.client.dto.AddClientRequest;
import com.s001.cocotaxi.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
// client 추가
public class ClientService {

    private final ClientRepository clientRepository;

    public Client save(AddClientRequest request) {
        return clientRepository.save(request.toEntity());
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }


}
