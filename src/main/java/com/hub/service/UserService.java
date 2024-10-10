package com.hub.service;

import org.springframework.stereotype.Service;

import com.hub.domain.User;
import com.hub.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;
	
	public User saveUser(User user) {
		validateDuplicateUser(user);
		return userRepository.save(user);
	}
	
	private void validateDuplicateUser(User user) {
		User findUser = userRepository.findByUrId(user.getUrId());
		if(findUser != null) {
			throw new IllegalStateException("이미 가입된 회원입니다.");
		}
	}

	

}
