package com.hub.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import com.hub.domain.User;
import com.hub.domain.UserRole;
import com.hub.dto.UserJoinDTO;

import jakarta.transaction.Transactional;

@SpringBootTest
public class UserServiceTest {
	
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public User createUser() {
		UserJoinDTO userJoinDTO = new UserJoinDTO();
		
		userJoinDTO.setUrId("testuser4");
		userJoinDTO.setUrPw("1234");
		userJoinDTO.setUrNm("조인성");
		userJoinDTO.setUrEml("testuser4@test.com");
		userJoinDTO.setUrPhn("01012341234");
		userJoinDTO.setUrPrplYn("Y");
		userJoinDTO.setUrStmbplYn("Y");
		
		return User.createUser(userJoinDTO, passwordEncoder);
	}
	
	@Test
	@DisplayName("회원가입 테스트")
	public void saveUserTest() {
		User user = createUser();
		User savedUser = userService.saveUser(user);
		assertEquals(user.getUrId(), savedUser.getUrId());
		assertEquals(user.getUrPw(), savedUser.getUrPw());
		assertEquals(user.getUrNm(), savedUser.getUrNm());
		assertEquals(user.getUrEml(), savedUser.getUrEml());
		assertEquals(user.getUrPhn(), savedUser.getUrPhn());
		assertEquals(user.getUrPrplYn(), savedUser.getUrPrplYn());
		assertEquals(user.getUrStmbplYn(), savedUser.getUrStmbplYn());
	    // 추가된 필드 검증
	    assertNotNull(savedUser.getUrJoinDt());  // 회원가입 일자는 null이 아니어야 함
	    assertEquals(UserRole.USER, savedUser.getUrAuthCode());  // 회원 권한은 USER로 설정되었는지 확인
	    assertEquals("ACTIVE", savedUser.getUrConditionCode());  // 회원 상태는 ACTIVE로 설정되었는지 확인
	}
}
