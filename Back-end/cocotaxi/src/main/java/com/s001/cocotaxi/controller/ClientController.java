package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.domain.Client;
import com.s001.cocotaxi.dto.request.AddClientRequest;
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

    @PostMapping("/api/client")
    public ResponseEntity<Client> addClientInfo(@RequestBody AddClientRequest request) {
        Client savedClient = clientService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedClient);
    }

//    @GetMapping("/api/client")
//    public ResponseEntity<List<ClientResponse>> findAllArticles() {
//        List<ClientResponse> clients = clientService.findAll()
//                .stream()
//                .map(ClientResponse::new)
//                .toList();
//
//        return ResponseEntity.ok()
//                .body(clients);
//    }
}
