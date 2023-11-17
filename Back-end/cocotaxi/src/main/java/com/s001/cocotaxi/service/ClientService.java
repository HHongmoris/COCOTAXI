package com.s001.cocotaxi.service;

import com.s001.cocotaxi.domain.Client;
import com.s001.cocotaxi.dto.request.AddClientRequest;
import com.s001.cocotaxi.repository.ClientRepository;
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

    //get
    public List<Client> findAll() {
        return clientRepository.findAll();
    }


}
