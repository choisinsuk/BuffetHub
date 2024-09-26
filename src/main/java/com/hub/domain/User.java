package com.hub.domain;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

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
	@Column(columnDefinition = "VARCHAR2(50)")
	private String ur_id; // 회원ID
	
	@Column(nullable = false, columnDefinition = "VARCHAR2(1000)")
	private String ur_pw; // 비밀번호
	@Column(nullable = false, columnDefinition = "VARCHAR2(20)")
	private String ur_nm; // 이름
	@Column(nullable = false, columnDefinition = "VARCHAR2(11)")
	private String ur_phn; // 전화번호
	@Column(nullable = false, columnDefinition = "VARCHAR2(50)")
	private String ur_eml; // 이메일
	@Column(nullable = false, columnDefinition = "VARCHAR2(1)")
	private String ur_prpl_yn; // 개인정보 이용약관 동의여부
	@Column(nullable = false, columnDefinition = "VARCHAR2(1)")
	private String ur_stmbpl_yn; // 가게 회원 약관 동의여부
	@Column(nullable = false, columnDefinition = "VARCHAR2(10)")
    @Enumerated(EnumType.STRING) // Enum 값을 문자열로 저장
    private UserRole ur_auth_code; // 단일 사용자 권한 코드 (단일 권한)
	@Column(nullable = false)
	private Date ur_join_dt; // 회원가입 일자
	@Column(nullable = false, columnDefinition = "VARCHAR2(10)")
	private String ur_condition_code; // 회원상태
	

	public void clearRole() {  // 사용자의 권한 초기화 하는 메서드
		this.ur_auth_code = null;
	}
	
	public void changePw(String ur_pw) {  // 비밀번호를 변경하는 메서드
		this.ur_pw = ur_pw;
	}
	
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
