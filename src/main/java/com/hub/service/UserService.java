package com.hub.service;

import org.springframework.stereotype.Service;

import com.hub.domain.User;
import com.hub.dto.UserModifyDTO;
import com.hub.repository.UserRepository;

import jakarta.transaction.Transactional;
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
	
    // 사용자 정보 수정
    @Transactional
    public void modify(UserModifyDTO dto, String urId) {
        // urId로 User 객체 조회
        User user = userRepository.findByUrId(urId);
        if (user == null) {
            throw new IllegalArgumentException("해당 사용자가 존재하지 않습니다.");
        }

        // 사용자 정보 수정
        user.modify(dto.getUrPhn(), dto.getUrEml());

        // 변경된 사용자 정보 저장 (JPA는 dirty checking을 통해 자동으로 저장합니다)
        userRepository.save(user);
    }

	

}
