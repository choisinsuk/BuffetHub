package com.hub.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class ReserveListDTO {

	private Long rsNb;
	private LocalDateTime rsDt; // 예약일
	private LocalDateTime rsTm; // 예약시간
	private Integer rsAdultPersonCnt; // 예약 성인 인원수
	private Integer rsChildPersonCnt; // 예약 아동 인원수
	private Integer rsPreagePersonCnt; // 예약 미취학 인원수
	
	public ReserveListDTO(Long rsNb,LocalDateTime rsDt, LocalDateTime rsTm, 
			Integer rsAdultPersonCnt, Integer rsChildPersonCnt, Integer rsPreagePersonCnt) {
		this.rsNb = rsNb;
		this.rsDt = rsDt;
		this.rsTm = rsTm;
		this.rsAdultPersonCnt = rsAdultPersonCnt;
		this.rsChildPersonCnt = rsChildPersonCnt;
		this.rsPreagePersonCnt = rsPreagePersonCnt;
	}
	
}
