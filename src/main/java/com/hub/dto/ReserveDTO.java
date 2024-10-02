package com.hub.dto;

import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReserveDTO {

	private Long rsNb; // 예약번호
	private LocalDateTime rsDt; // 예약일자

	private Integer rsTotalPersonCnt; // 예약 총 인원수
	private Integer rsAdultPersonCnt; // 예약 성인 인원수
	private Integer rsChildPersonCnt; // 예약 아동 인원수
	private Integer rsPreagePersonCnt; // 예약 미취학 인원수

	private Integer rsVisitTotalCnt; // 방문 총 인원수
	private Integer rsVisitAdultCnt; // 방문 성인 인원수
	private Integer rsVisitChildCnt; // 방문 아동 인원수
	private Integer rsVisitPreageCnt; // 방문 미취학 인원수
	private Integer rsRealpeopleCnt; // 실제 방문 인원

	private boolean rsVisitYn; // 방문여부
	private boolean rsPaymentCompleteYn; // 결제완료여부

	private String urId; // 사용자 ID
	private Long bvNb; // 식사권 번호

}
