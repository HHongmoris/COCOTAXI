package com.s001.cocotaxi.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DispatchListRequest {
    //호출 번호 입력 받아서 관련 후보군 추출
    private int callId;
}
