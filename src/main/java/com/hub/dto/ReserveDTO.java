package com.hub.dto;

import java.time.LocalDate;
import lombok.Data;

// Data Transfer Object
// 엔티티의 데이터를 클라이언트로 전송하거나 클라이언트로부터 데이터를 받을때 사용
@Data
public class ReserveDTO 
{
	private Long rsNb; // 예약번호 (PK)
    private LocalDate rsDt; // 예약일자
    private Integer rsTotalPersonCnt; // 예약 총 인원수
    private Integer rsAdultPersonCnt; // 예약 성인 인원수
    private Integer rsChildPersonCnt; // 예약 아동 인원수
    private Integer rsPreagePersonCnt; // 예약 미취학 인원수
    private Integer rsVisitAdultCnt; // 방문 성인 인원수
    private Integer rsVisitChildCnt; // 방문 아동 인원수
    private Integer rsVisitPreageCnt; // 방문 미취학 인원수
    private Integer rsVisitTotalCnt; // 방문 총 인원수
    private Integer rsVisitYn; // 방문 여부 (1: TRUE, 0: FALSE)
    private Integer rsPaymentCompleteYn; // 결제 완료 여부 (1: TRUE, 0: FALSE)
    private Long bvNb; // 식사권 번호 (FK)
    private String urId; // 사용자 ID (FK)
}
