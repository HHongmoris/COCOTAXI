package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.domain.Client;
import com.s001.cocotaxi.dto.AddClientRequest;
import com.s001.cocotaxi.service.ClientService;
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
