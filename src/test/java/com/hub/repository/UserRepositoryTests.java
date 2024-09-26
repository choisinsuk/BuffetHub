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
	    public void testInsertUserWithMultipleRoles() {
	        
	        // 새로운 User 엔티티 생성
	        User user = User.builder()
	                .ur_id("testUser2")
	                .ur_pw(passwordEncoder.encode("password1"))   // 비밀번호 인코딩
	                .ur_nm("김태희")                              // 이름
	                .ur_phn("01098765432")                        // 전화번호
	                .ur_eml("testUser@example.com")          // 이메일
	                .ur_prpl_yn("1")                              // 개인정보 이용약관 동의 여부
	                .ur_stmbpl_yn("1")                            // 가게 회원 약관 동의 여부
	                .ur_join_dt(new Date())                       // 회원가입 일자
	                .ur_condition_code("ACTIVE")  				  // 회원 상태
	                .ur_auth_code(UserRole.ADMIN)
	                .build();
	
			// 사용자 저장
			userRepository.save(user);
			
	        // 저장된 사용자 조회
	        User savedUser = userRepository.findById(user.getUr_id()).orElse(null);

			
		}
}
