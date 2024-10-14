package com.hub.service;

import org.springframework.stereotype.Service;

import com.hub.domain.User;
import com.hub.dto.UserDTO;
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
	
    // 사용자 ID로 회원 정보 조회
    public User getUserById(String urId) {
        User user = userRepository.findByUrId(urId);
        if (user == null) {
            throw new IllegalArgumentException("User not found with id: " + urId);
        }
        return user;
    }
    
    // 사용자 프로필 수정
    public void updateUserProfile(UserDTO userDTO, String urId) {
        User user = userRepository.findByUrId(urId);

        // DTO에서 정보를 가져와서 User 객체를 업데이트
        user.changePhoneNumber(userDTO.getUrPhn()); // 전화번호 변경
        user.changeEmail(userDTO.getUrEml()); // 이메일 변경

        userRepository.save(user); // 변경된 사용자 정보 저장
    }
    
    // 사용자 ID로 권한 포함된 정보 조회
    public User findUserWithRolesById(String userId) {
        return userRepository.getWithRoles(userId); // 권한 포함된 사용자 정보 조회
    }
	
	private void validateDuplicateUser(User user) {
		User findUser = userRepository.findByUrId(user.getUrId());
		if(findUser != null) {
			throw new IllegalStateException("이미 가입된 회원입니다.");
		}
	}

	

}
