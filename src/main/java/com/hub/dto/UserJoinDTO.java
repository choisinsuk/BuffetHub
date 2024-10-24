package com.hub.dto;

import java.util.Date;

import com.hub.domain.UserRole;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  //getter/setter, toString, equals, hashCode 까지 자동으로 추가
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 자동으로 생성
@AllArgsConstructor  // 모든 필드를 파라미터로 받는 생성자를 자동으로 생성
@Builder
public class UserJoinDTO {
	
	@Size(min = 8, max = 25, message = "회원ID는 8~25자 사이의 영문 또는 숫자만 가능합니다.")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "회원ID는 영문과 숫자만 포함할 수 있습니다.")
	private String urId; // 회원ID
	
    @Size(min = 8, max = 25, message = "비밀번호는 8~25자 사이의 영문+숫자 조합이어야 합니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,25}$", message = "비밀번호는 영문과 숫자를 포함해야 합니다.")
	private String urPw; // 비밀번호
    
    @Size(min = 2, max = 10, message = "이름은 2~10자 한글만 가능합니다.")
    @Pattern(regexp = "^[가-힣]{2,10}$", message = "이름은 2~10자 한글로만 입력해야 합니다.")
	private String urNm; // 이름
    
    @Pattern(regexp = "^010\\d{8}$", message = "전화번호는 010으로 시작하는 11자리 숫자여야 합니다.")
	private String urPhn; // 전화번호
    
    @Pattern(regexp = "^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", message = "유효한 이메일 주소 형식이 아닙니다.")
	private String urEml; // 이메일
	private String urPrplYn; // 개인정보 이용약관 동의여부
	private String urStmbplYn; // 가게 회원 약관 동의여부
	private Date urJoinDt;

}
