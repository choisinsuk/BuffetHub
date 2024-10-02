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
	@Column(columnDefinition = "VARCHAR2(50)")
	private String urId; // 회원ID

	@Column(nullable = false, columnDefinition = "VARCHAR2(1000)")
	private String urPw; // 비밀번호
	@Column(nullable = false, columnDefinition = "VARCHAR2(20)")
	private String urNm; // 이름
	@Column(nullable = false, columnDefinition = "VARCHAR2(11)")
	private String urPhn; // 전화번호
	@Column(nullable = false, columnDefinition = "VARCHAR2(50)")
	private String urEml; // 이메일
	@Column(nullable = false, columnDefinition = "VARCHAR2(1)")
	private String urPrplYn; // 개인정보 이용약관 동의여부
	@Column(nullable = false, columnDefinition = "VARCHAR2(1)")
	private String urStmbplYn; // 가게 회원 약관 동의여부
	@Column(nullable = false, columnDefinition = "VARCHAR2(10)")
	private String urAuthCode; // 회원 권한

	@Column(nullable = false)
	private Date urJoinDt; // 회원가입 일자

	@Column(nullable = false, columnDefinition = "VARCHAR2(10)")
	private String urConditionCode; // 회원상태

	public void addRole(UserRole userRole) { // 사용자의 권한을 추가하는 메서드
		this.urAuthCode = userRole.name();
	}

	public void clearRole() { // 사용자의 권한 초기화 하는 메서드
		this.urAuthCode = null;
	}

	public void changePw(String urPw) { // 비밀번호를 변경하는 메서드
		this.urPw = urPw;
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
