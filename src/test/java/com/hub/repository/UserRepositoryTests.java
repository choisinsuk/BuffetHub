package com.hub.repository;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hub.domain.User;
import com.hub.domain.UserRole;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class UserRepositoryTests {

		@Autowired
		private UserRepository userRepository;
		@Autowired
		private PasswordEncoder passwordEncoder;
		
		@Test
		public void testInsertUser() {
			
			User user = User.builder()
					.urId("testUser4")
					.urPw(passwordEncoder.encode("1234"))
	                .urNm("홍길동")                        // 이름
	                .urPhn("01012345678")                      // 전화번호
	                .urEml("test@example.com")                   // 이메일
	                .urPrplYn("1")                             // 개인정보 이용약관 동의 여부
	                .urStmbplYn("1")                           // 가게 회원 약관 동의 여부
	                .urJoinDt(new Date())                       // 회원가입 일자
	                .urConditionCode("ACTIVE")                   // 회원 상태
	                .build();
	
			// 사용자 저장
			userRepository.save(user);
			
	        // 저장된 사용자 조회
	        User savedUser = userRepository.findById(user.getUrId()).orElse(null);

			
		}
}
