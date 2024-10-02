package com.hub.domain;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@SequenceGenerator(name = "BV_SEQ_GEN", // 시퀀스 제너레이터 이름
		sequenceName = "BV_SEQ", // 시퀀스 이름
		initialValue = 1, // 시작값
		allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_buffetvoucher")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuffetVoucher {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BV_SEQ_GEN")
	@Column(nullable = false, columnDefinition = "NUMBER(4)")
	private Long bvNb; // 식사권 번호

	@Column(nullable = false)
	private LocalDateTime bvStartTm; // 식사 시작 시간
	@Column(nullable = false)
	private LocalDateTime bvEndTm; // 식사 종료 시간

	public void changeStart_tm(LocalDateTime bvStartTm) {
		this.bvStartTm = bvStartTm;

		// end_tm 계산(start_tm에서 2시간 추가)
		this.bvEndTm = calculateEndTime(bvStartTm);
	}

	// end_tm 계산 메서드
	private LocalDateTime calculateEndTime(LocalDateTime startTm) {
		return startTm.plusHours(2);
	}

	/*
	 * // Reserve와의 관계 설정
	 * 
	 * @OneToOne(mappedBy = "voucher") private Reserve reserve; // 예약 정보
	 */

}
