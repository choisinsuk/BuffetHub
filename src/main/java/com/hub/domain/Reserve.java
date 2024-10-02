package com.hub.domain;



import java.time.LocalDateTime;

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
	@Column( nullable = false, columnDefinition = "NUMBER(8)")
	private Long rsNb; // 예약번호

	@Column(nullable = false)
	private LocalDateTime rsDt; // 예약일자

	@Builder.Default
	@Column( nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsTotalPersonCnt = 1; // 예약 총 인원수
	@Builder.Default
	@Column(nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsAdultPersonCnt = 1; // 예약 성인 인원수
	@Builder.Default
	@Column( nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsChildPersonCnt = 0; // 예약 아동 인원수
	@Builder.Default
	@Column( nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsPreagePersonCnt = 0; // 예약 미취학 인원수

	@Builder.Default
	@Column( nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsVisitTotalCnt = 0; // 방문 총 인원수
	@Builder.Default
	@Column( nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsVisitAdultCnt = 0; // 방문 성인 인원수
	@Builder.Default
	@Column(nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsVisitChildCnt = 0; // 방문 아동 인원수
	@Builder.Default
	@Column(nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsVisitPreageCnt = 0; // 방문 미취학 인원수
	@Builder.Default
	@Column(nullable = false, columnDefinition = "NUMBER(4)")
	private Integer rsRealpeopleCnt = 0; // 실제 방문 인원

	@Builder.Default
	@Column( nullable = false)
	private boolean rsVisitYn = false; // 방문여부
	@Builder.Default
	@Column( nullable = false)
	private boolean rsPaymentCompleteYn = false; // 결제완료여부

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

	public void changeRs_dt(LocalDateTime rsDt) {
		this.rsDt = rsDt;
	}

	// 인원수 총합 계산 메서드
	private void updateTotalPersonCount() {
		this.rsTotalPersonCnt = this.rsAdultPersonCnt + this.rsChildPersonCnt + this.rsPreagePersonCnt;
	}

	// 예약 인원수 변경 메서드
	public void changeRs_adult_person_cnt(Integer rsAdultPersonCnt) {
		this.rsAdultPersonCnt = rsAdultPersonCnt;
		updateTotalPersonCount(); // 총 인원수 업데이트
	}

	public void changeRs_child_person_cnt(Integer rsChildPersonCnt) {
		this.rsChildPersonCnt = rsChildPersonCnt;
		updateTotalPersonCount(); // 총 인원수 업데이트
	}

	public void changeRs_preage_person_cnt(Integer rsPreagePersonCnt) {
		this.rsPreagePersonCnt = rsPreagePersonCnt;
		updateTotalPersonCount(); // 총 인원수 업데이트
	}

	// 방문 인원수 총합 계산 메서드
	private void updateVisitTotalCount() {
		this.rsVisitTotalCnt = this.rsVisitAdultCnt + this.rsVisitChildCnt + this.rsVisitPreageCnt;
	}

	// 방문 인원수 변경 메서드
	public void changeRs_visit_adult_cnt(Integer rsVisitAdultCnt) {
		this.rsVisitAdultCnt = rsVisitAdultCnt;
		updateVisitTotalCount(); // 방문 총 인원수 업데이트
	}

	public void changeRs_visit_child_cnt(Integer rsVisitChildCnt) {
		this.rsVisitChildCnt = rsVisitChildCnt;
		updateVisitTotalCount(); // 방문 총 인원수 업데이트
	}

	public void changeRs_visit_preage_cnt(Integer rsVisitPreageCnt) {
		this.rsVisitPreageCnt = rsVisitPreageCnt;
		updateVisitTotalCount(); // 방문 총 인원수 업데이트
	}
	
	public void changeRs_realpeople_cnt(Integer rsRealpeopleCnt) {
		this.rsRealpeopleCnt = rsRealpeopleCnt;
	}

	public void changeRs_visit_yn(boolean rsVisitYn) {
		this.rsVisitYn = rsVisitYn;
	}

	public void changeRs_payment_complete_yn(boolean rsPaymentCompleteYn) {
		this.rsPaymentCompleteYn = rsPaymentCompleteYn;
	}

}
