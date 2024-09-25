package com.hub.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReserveDTO {

	private Integer rs_nb; // 예약번호

	private Date rs_dt; // 예약일자

	private Integer rs_total_person_cnt; // 예약 총 인원수
	private Integer rs_adult_person_cnt; // 예약 성인 인원수
	private Integer rs_child_person_cnt; // 예약 아동 인원수
	private Integer rs_preage_person_cnt; // 예약 미취학 인원수

	private Integer rs_visit_total_cnt; // 방문 총 인원수
	private Integer rs_visit_adult_cnt; // 방문 성인 인원수
	private Integer rs_visit_child_cnt; // 방문 아동 인원수
	private Integer rs_visit_preage_cnt; // 방문 미취학 인원수
	private Integer rs_realpeople_cnt; // 실제 방문 인원

	private boolean rs_visit_yn; // 방문여부
	private boolean rs_payment_complete_yn; // 결제완료여부

	private String ur_id; // 사용자 ID
	private Integer bv_nb; // 식사권 번호

}
