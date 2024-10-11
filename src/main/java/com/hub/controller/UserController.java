package com.hub.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hub.domain.User;
import com.hub.dto.UserJoinDTO;
import com.hub.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user") // API 기본 URL 설정
@RequiredArgsConstructor // 필수(final 또는 @NonNull로 선언된) 필드들만을 파라미터로 갖는 생성자를 자동으로 생성
public class UserController {

	private final UserService userService; // UserService 의존성 주입
	private final PasswordEncoder passwordEncoder;

	// 회원가입 요청 처리
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserJoinDTO userJoinDTO) {
		
	    Map<String, Object> response = new HashMap<>();

		
		try {
			// UserJoinDTO를 기반으로 User 객체 생성
			User user = User.createUser(userJoinDTO, passwordEncoder);

			// UserService를 사용해 사용자 저장
			userService.saveUser(user);

	        // 회원가입 성공 시 성공 메시지와 성공 여부 반환
	        response.put("success", true);
	        response.put("message", "회원가입이 성공적으로 완료되었습니다.");
	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    } catch (Exception e) {
	        // 회원가입 중 예외 발생 시 실패 메시지와 실패 여부 반환
	        response.put("success", false);
	        response.put("message", "회원가입 중 오류가 발생했습니다.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

}