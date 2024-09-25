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
	@Column(name= "cq_nb", nullable = false, columnDefinition = "NUMBER(8)")
	private Integer cq_nb; // 고객문의 번호
	
	@ManyToOne
	@JoinColumn(name = "ur_id", nullable = false)
	private User user; // 회원 아이디
	
	@Column(name = "cq_title",nullable = false, columnDefinition = "VARCHAR2(100)")
	private String cq_title; // 고객문의 제목
	
	@Column(name = "cq_ctt",nullable = false, columnDefinition = "VARCHAR2(4000)")
	private String cq_ctt; // 고객문의 내용
	
	@Column(name = "cq_regdt",nullable = false)
	private Date cq_regdt; // 고객문의 등록일자
	
	@Column(name = "cq_answer_ctt",nullable = true, columnDefinition = "VARCHAR2(4000)")
	private String cq_answer_ctt; // 고객문의 답변 내용(널 가능)
	
	@Column(name = "cq_answer_regdt",nullable = true)
	private Date cq_answer_regdt; // 고객문의 답변 일자(널 가능)
	
	@Column(name = "cq_pic",nullable = true, columnDefinition = "VARCHAR2(1000)")
	private String cq_pic; // 고객문의 사진(널 가능)

}