package com.hub.domain;

import java.time.LocalDateTime;


import jakarta.persistence.*;
import lombok.*;
@Entity
@SequenceGenerator(name = "CUSTOMERINQUIRY_SEQ_GEN", // 시퀀스 제너레이터 이름
sequenceName = "CUSTOMERINQUIRY_SEQ", // 시퀀스 이름
initialValue = 1, // 시작 값
allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_customerinquiry")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInquiry {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUSTOMERINQUIRY_SEQ_GEN")
	@Column(nullable = false, columnDefinition = "NUMBER(8)")
	private Long cqNb; // 고객문의 번호
	
	@ManyToOne
	@JoinColumn( nullable = false)
	private User user; // 회원 아이디
	

	@Column(nullable = false, columnDefinition = "VARCHAR2(100)")
	private String cqTitle; // 고객문의 제목

	
	@Column(nullable = false, columnDefinition = "VARCHAR2(4000)")
	private String cqCtt; // 고객문의 내용
	
	@Column(nullable = false)
	private LocalDateTime cqRegdt; // 고객문의 등록일자
	
	@Column(nullable = true, columnDefinition = "VARCHAR2(4000)")
	private String cqAnswerCtt; // 고객문의 답변 내용(널 가능)
	
	@Column(nullable = true)
	private LocalDateTime cqAnswerRegdt; // 고객문의 답변 일자(널 가능)
	
	@Column(nullable = true, columnDefinition = "VARCHAR2(1000)")
	private String cqPic; // 고객문의 사진(널 가능)

}