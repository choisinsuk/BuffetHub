package com.hub.dto;

import java.util.Date;

import com.hub.domain.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  //getter/setter, toString, equals, hashCode 까지 자동으로 추가
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 자동으로 생성
@AllArgsConstructor  // 모든 필드를 파라미터로 받는 생성자를 자동으로 생성
public class UserJoinDTO {
	
	private String urId; // 회원ID
	private String urPw; // 비밀번호
	private String urNm; // 이름
	private String urPhn; // 전화번호
	private String urEml; // 이메일
	private String urPrplYn; // 개인정보 이용약관 동의여부
	private String urStmbplYn; // 가게 회원 약관 동의여부
	private Date urJoinDt;

}
