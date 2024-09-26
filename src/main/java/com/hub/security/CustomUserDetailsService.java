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

		// UserDTO 객체 생성
		UserDTO userDTO = new UserDTO(user.getUr_id(), user.getUr_pw(), user.getUr_nm(), user.getUr_phn(),
				user.getUr_eml(), user.getUr_prpl_yn(), user.getUr_stmbpl_yn(), user.getUr_auth_code(),
				user.getUr_join_dt(), user.getUr_condition_code());
		log.info(userDTO);

		 //사용자 권한 설정
		Collection<SimpleGrantedAuthority> authorities = Collections
				.singletonList(new SimpleGrantedAuthority("ROLE_" + userDTO.getUr_auth_code()));

		return userDTO;
	}

}
