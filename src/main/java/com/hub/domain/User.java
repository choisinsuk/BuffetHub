package com.hub.domain;

import java.util.Date;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "tbl_user")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	private String ur_id; // 회원ID
	
	@Column(nullable = false)
	private String ur_pw; // 비밀번호
	@Column(nullable = false)
	private String ur_nm; // 이름
	@Column(nullable = false)
	private String ur_phn; // 전화번호
	@Column(nullable = false)
	private String ur_eml; // 이메일
	@Column(nullable = false)
	private boolean ur_prpl_yn; // 개인정보 이용약관 동의여부
	@Column(nullable = false)
	private boolean ur_stmbpl_yn; // 가게 회원 약관 동의여부
	@Column(nullable = false)
	private String ur_auth_code; // 회원 권한
	@Column(nullable = false)
	private Date ur_join_dt; // 회원가입 일자
	@Column(nullable = false)
	private String ur_condition_code; // 회원상태
	
	/*
	 * // Reserve와의 관계 설정
	 * 
	 * @OneToMany(mappedBy = "user") private Reserve reserve;
	 * 
	 * // CustomerInquiry와의 관계 설정
	 * 
	 * @OneToMany(mappedBy = "user") private CustomerInquiry customerInquiry;
	 * 
	 * // ReviewBoard와의 관계 설정
	 * 
	 * @OneToMany(mappedBy = "user") private ReviewBoard reviewBoard; // 예약 정보
	 */}
