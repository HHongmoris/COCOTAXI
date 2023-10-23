package com.s001.cocotaxi.client.dto;

import com.s001.cocotaxi.client.domain.Client;
import lombok.Getter;

@Getter
public class ClientResponse {

    private final String clientName;

    public ClientResponse(Client client) {
        this.clientName = client.getClientName();
    }
}
