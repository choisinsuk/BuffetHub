package com.hub.domain;

import java.util.Date;

import jakarta.persistence.*;
import lombok.*;

@Entity
@SequenceGenerator(name = "RESERVE_SEQ_GEN", // 시퀀스 제너레이터 이름
					sequenceName = "RESERVE_SEQ", // 시퀀스 이름
					initialValue = 1, // 시작 값
					allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_reserve")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reserve {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RESERVE_SEQ_GEN")
	// 사용할 전략을 시퀀스로 선택, 식별자 생성기를 설정해 놓은 RESERVE_SEQ_GEN 으로 설정
	private Long rs_nb; // 예약번호
	
	private Date rs_dt; // 예약일자
	
	private int rs_total_person_cnt; // 예약 총 인원수
	private int rs_adult_person_cnt; // 예약 성인 인원수
	private int rs_child_person_cnt; // 예약 아동 인원수
	private int rs_preage_person_cnt; // 예약 미취학 인원수
	
	private int rs_visit_total_cnt; // 방문 총 인원수
	private int rs_visit_adult_cnt; // 방문 성인 인원수
	private int rs_visit_child_cnt; // 방문 아동 인원수
	private int rs_visit_preage_cnt; // 방문 미취학 인원수
	
	private boolean rs_visit_yn; // 방문여부
	private boolean rs_payment_complete_yn; // 결제완료여부
	
	private int rs_realpeople_cnt; // 실제 방문 인원
	
	// 관계 설정(외래 키를 받아오는 쪽)
	@OneToOne
	@JoinColumn(name = "bv_nb", nullable = false) // 외래 키 설정
	private BuffetVoucher voucher; // 식사권 번호
	
	
	@ManyToOne
	@JoinColumn(name = "ur_id", nullable = false)
	private User user; // 사용자 ID
	
	/*
	 * // ReviewBoard와의 관계 설정
	 * 
	 * @OneToOne(mappedBy = "review_board") private ReviewBoard reviewBoard; // 예약
	 * 정보
	 */
	
}
