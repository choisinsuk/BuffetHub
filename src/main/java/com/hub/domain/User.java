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
	@Column(name = "ur_id",nullable = false, length = 25)
	private String ur_id; // 회원ID
	
	@Column(name = "ur_pw", nullable = false, length = 1000)
	private String ur_pw; // 비밀번호
	@Column(name = "ur_nm",nullable = false, length = 20)
	private String ur_nm; // 이름
	@Column(name = "ur_phn",nullable = false, length = 11)
	private String ur_phn; // 전화번호
	@Column(name = "ur_eml",nullable = false, length = 50)
	private String ur_eml; // 이메일
	
	@Column(name = "ur_prpl_yn",nullable = false)
	private boolean ur_prpl_yn; // 개인정보 이용약관 동의여부
	@Column(name = "ur_stmbpl_yn",nullable = false)
	private boolean ur_stmbpl_yn; // 가게 회원 약관 동의여부
	
	@Column(name = "ur_auth_code",nullable = false, length = 10)
	private String ur_auth_code; // 회원 권한
	
	@Column(name = "ur_join_dt", nullable = false)
	private Date ur_join_dt; // 회원가입 일자
	
	@Column(name ="ur_condition_code", nullable = false)
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
