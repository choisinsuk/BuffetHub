package com.hub.controller;

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
    public ResponseEntity<String> registerUser(@RequestBody UserJoinDTO userJoinDTO) {
        try {
            // UserJoinDTO를 기반으로 User 객체 생성
            User user = User.createUser(userJoinDTO, passwordEncoder);

            // UserService를 사용해 사용자 저장
            userService.saveUser(user);

            // 회원가입 성공 시 HTTP 201 응답과 성공 메시지 반환
            return new ResponseEntity<>("회원가입이 성공적으로 완료되었습니다.", HttpStatus.CREATED);
        } catch (Exception e) {
            // 회원가입 중 예외 발생 시 HTTP 500 응답과 에러 메시지 반환
            return new ResponseEntity<>("회원가입 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 사용자 ID 중복 확인 요청 처리
    @GetMapping("/check-duplicate")
    public ResponseEntity<Boolean> checkDuplicate(@RequestParam String urId) {
        boolean isDuplicate = userService.isUserIdDuplicate(urId);
        return ResponseEntity.ok(isDuplicate); // 중복 여부 반환
    }
    

}