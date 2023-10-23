package com.s001.cocotaxi.client.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
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
    public Client(String clientName){
        this.clientName = clientName;
    }

}
