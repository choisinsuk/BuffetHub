package com.hub.domain;

import java.util.Date;

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
	private Long cq_nm; // 고객문의 번호
	
	@ManyToOne
	@JoinColumn(name = "ur_id", nullable = false)
	private User user; // 회원 아이디
	
	@Column(nullable = false)
	private String cq_title; // 고객문의 제목
	@Column(nullable = false)
	private String cq_ctt; // 고객문의 내용
	@Column(nullable = false)
	private Date cq_regdt; // 고객문의 등록일자
	
	private String cq_answer_ctt; // 고객문의 답변 내용
	private Date cq_answer_regdt; // 고객문의 답변 일자
	private String cq_pic; // 고객문의 사진

}