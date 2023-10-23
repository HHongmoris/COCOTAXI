package com.s001.cocotaxi.client.dto;

import com.s001.cocotaxi.client.domain.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddClientRequest {

    private String clientName;

    public Client toEntity() {
        return Client.builder()
                .clientName(clientName)
                .build();
    }

}
