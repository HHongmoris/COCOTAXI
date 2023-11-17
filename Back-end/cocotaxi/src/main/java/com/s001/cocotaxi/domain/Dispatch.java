package com.s001.cocotaxi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "dispatch")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dispatch {
    //배차번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dispatch_id", nullable = false)
    private int dispatchId;

    //배차상태
    @Column(name = "dispatch_state")
    private String dispatchState;

    //결제화폐단위
    @Column(name = "currency")
    private String currency;

    //결제금액
    @Column(name = "price")
    private int price;

    //결제수단
    @Column(name = "payment_type")
    private String paymentType;

    //기사ID (Driver 테이블)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    //호출번호(Callings 테이블)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "call_id")
    private Callings callings;

    //고객ID(CLient 테이블)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;
}
