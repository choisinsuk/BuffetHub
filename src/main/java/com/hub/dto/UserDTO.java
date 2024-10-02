package com.hub.dto;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	private String ur_id; // 회원ID
	private String ur_pw; // 비밀번호
	private String ur_nm; // 이름
	private String ur_phn; // 전화번호
	private String ur_eml; // 이메일
	private String ur_prpl_yn; // 개인정보 이용약관 동의여부
	private String ur_stmbpl_yn; // 가게 회원 약관 동의여부
	private UserRole ur_auth_code; // 회원 권한
	private Date ur_join_dt; // 회원가입 일자
	private String ur_condition_code; // 회원상태

    // UserDTO 생성자
    public UserDTO(String ur_id, String ur_pw, String ur_nm, String ur_phn, String ur_eml, String ur_prpl_yn,
                   String ur_stmbpl_yn, UserRole ur_auth_code, Date ur_join_dt, String ur_condition_code) {
    	
    	super(ur_id, ur_pw, List.of(new SimpleGrantedAuthority("ROLE_" + ur_auth_code))); // User의 생성자 호출
        this.ur_id = ur_id;
        this.ur_pw = ur_pw;
        this.ur_nm = ur_nm;
        this.ur_phn = ur_phn;
        this.ur_eml = ur_eml;
        this.ur_prpl_yn = ur_prpl_yn;
        this.ur_stmbpl_yn = ur_stmbpl_yn;
        this.ur_auth_code = ur_auth_code;
        this.ur_join_dt = ur_join_dt;
        this.ur_condition_code = ur_condition_code;
    }

	// JWT용 Map 반환 메서드
	public Map<String, Object> getClaims() {
		Map<String, Object> map = new HashMap<>();
		map.put("ur_id", this.ur_id);
		map.put("ur_pw", this.ur_pw);
		map.put("ur_nm", this.ur_nm);
		map.put("ur_phn", this.ur_phn);
		map.put("ur_eml", this.ur_eml);
		map.put("ur_prpl_yn", this.ur_prpl_yn);
		map.put("ur_stmbpl_yn", this.ur_stmbpl_yn);
		map.put("ur_auth_code", this.ur_auth_code);
		map.put("ur_join_dt", this.ur_join_dt);
		map.put("ur_condition_code", this.ur_condition_code);
		return map;
	}


}
