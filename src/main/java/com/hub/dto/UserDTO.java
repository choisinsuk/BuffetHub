package com.hub.dto;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.hub.domain.UserRole;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO extends User {
	private static final long serialVersionUID = 1L;

	private String urId; // 회원ID
	private String urPw; // 비밀번호
	private String urNm; // 이름
	private String urPhn; // 전화번호
	private String urEml; // 이메일
	private String urPrplYn; // 개인정보 이용약관 동의여부
	private String urStmbplYn; // 가게 회원 약관 동의여부
	private UserRole urAuthCode; // 회원 권한
	private Date urJoinDt; // 회원가입 일자
	private String urConditionCode; // 회원상태

    // UserDTO 생성자
    public UserDTO(String urId, String urPw, String urNm, String urPhn, String urEml, String urPrplYn,
                   String urStmbplYn, UserRole urAuthCode, Date urJoinDt, String urConditionCode) {
    	
    	super(urId, urPw, List.of(new SimpleGrantedAuthority("ROLE_" + urAuthCode))); // User의 생성자 호출
        this.urId = urId;
        this.urPw = urPw;
        this.urNm = urNm;
        this.urPhn = urPhn;
        this.urEml = urEml;
        this.urPrplYn = urPrplYn;
        this.urStmbplYn = urStmbplYn;
        this.urAuthCode = urAuthCode;
        this.urJoinDt = urJoinDt;
        this.urConditionCode = urConditionCode;
    }

	// JWT용 Map 반환 메서드
	public Map<String, Object> getClaims() {
		Map<String, Object> map = new HashMap<>();
		map.put("urId", this.urId);
		map.put("urPw", this.urPw);
		map.put("urNm", this.urNm);
		map.put("urPhn", this.urPhn);
		map.put("urEml", this.urEml);
		map.put("urPrplYn", this.urPrplYn);
		map.put("urStmbplYn", this.urStmbplYn);
		map.put("urAuthCode", this.urAuthCode);
		map.put("urJoinDt", this.urJoinDt);
		map.put("urConditionCode", this.urConditionCode);
		return map;
	}


}
