package com.s001.cocotaxi.client.controller;

import com.s001.cocotaxi.client.domain.Client;
import com.s001.cocotaxi.client.dto.AddClientRequest;
import com.s001.cocotaxi.client.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/api/articles")
    public ResponseEntity<Client> addClientInfo(@RequestBody AddClientRequest request) {
        Client savedClient = clientService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedClient);
    }
}
