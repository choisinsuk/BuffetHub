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
	@Column(name = "rs_nb", nullable = false, columnDefinition = "NUMBER(8)")
	private Integer rs_nb; // 예약번호

	@Column(name = "rs_dt", nullable = false)
	private Date rs_dt; // 예약일자

	@Column(name = "rs_total_person_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_total_person_cnt; // 예약 총 인원수
	@Column(name = "rs_adult_person_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_adult_person_cnt; // 예약 성인 인원수
	@Column(name = "rs_child_person_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_child_person_cnt; // 예약 아동 인원수
	@Column(name = "rs_preage_person_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_preage_person_cnt; // 예약 미취학 인원수

	@Column(name = "rs_visit_total_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_visit_total_cnt; // 방문 총 인원수
	@Column(name = "rs_visit_adult_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_visit_adult_cnt; // 방문 성인 인원수
	@Column(name = "rs_visit_child_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_visit_child_cnt; // 방문 아동 인원수
	@Column(name = "rs_visit_preage_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_visit_preage_cnt; // 방문 미취학 인원수
	@Column(name = "rs_realpeople_cnt", nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rs_realpeople_cnt; // 실제 방문 인원

	@Column(name = "rs_visit_yn", nullable = false)
	@Builder.Default
	private boolean rs_visit_yn = false; // 방문여부
	@Column(name = "rs_payment_complete_yn", nullable = false)
	@Builder.Default
	private boolean rs_payment_complete_yn = false; // 결제완료여부

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

	public void changeRs_dt(Date rs_dt) {
		this.rs_dt = rs_dt;
	}

	public void changeRs_adult_person_cnt(Integer rs_adult_person_cnt) {
		this.rs_adult_person_cnt = rs_adult_person_cnt;
	}

	public void changeRs_child_person_cnt(Integer rs_child_person_cnt) {
		this.rs_child_person_cnt = rs_child_person_cnt;
	}

	public void changeRs_preage_person_cnt(Integer rs_preage_person_cnt) {
		this.rs_preage_person_cnt = rs_preage_person_cnt;
	}

	public void changeRs_visit_adult_cnt(Integer rs_visit_adult_cnt) {
		this.rs_visit_adult_cnt = rs_visit_adult_cnt;
	}

	public void changeRs_visit_child_cnt(Integer rs_visit_child_cnt) {
		this.rs_visit_child_cnt = rs_visit_child_cnt;
	}

	public void changeRs_visit_preage_cnt(Integer rs_visit_preage_cnt) {
		this.rs_visit_preage_cnt = rs_visit_preage_cnt;
	}

	public void changeRs_visit_yn(boolean rs_visit_yn) {
		this.rs_visit_yn = rs_visit_yn;
	}

	public void changeRs_payment_complete_yn(boolean rs_payment_complete_yn) {
		this.rs_payment_complete_yn = rs_payment_complete_yn;
	}

}
