package com.hub.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hub.domain.User;
import com.hub.dto.UserDTO;
import com.hub.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// loadUserByUsername 에서 사용자 정보를 조회하고 해당 사용자의 인증과 권한을 처리하는 메서드
		log.info("-----------loadUserByUsername--------------");

		User user = userRepository.getWithRoles(username);
		if (user == null) {
			throw new UsernameNotFoundException("Not Found");
		}
		
        // 로그: 사용자의 권한 정보 확인
        log.info("User: {}, Role: {}", user.getUrId(), user.getUrAuthCode());

		// UserDTO 객체 생성
		UserDTO userDTO = new UserDTO(user.getUrId(), user.getUrPw(), user.getUrNm(), user.getUrPhn(),
				user.getUrEml(), user.getUrPrplYn(), user.getUrStmbplYn(), user.getUrAuthCode(),
				user.getUrJoinDt(), user.getUrConditionCode());
		log.info(userDTO);


		return userDTO;
	}

}
