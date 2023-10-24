package com.s001.cocotaxi.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table (name = "Client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clientId", updatable = false)
    private int clientId;

    @Column(name = "clientName")
    private String clientName;

    @Builder
    public Client(String clientName, int clientId){
        this.clientName = clientName;
        this.clientId = clientId;
    }

}