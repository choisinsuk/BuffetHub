package com.hub.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hub.domain.User;
import com.hub.dto.SearchIdDTO;
import com.hub.dto.UserDTO;
import com.hub.dto.UserModifyDTO;
import com.hub.dto.UserPwChangeDTO;
import com.hub.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;
	
	 @Autowired
	 private PasswordEncoder passwordEncoder;
	
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
    
    
    public String getCurrentUserId() {
        // 현재 로그인한 사용자의 ID를 반환하는 로직
        // 예: Spring Security의 SecurityContextHolder에서 얻어올 수 있음
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
    
    //비밀번호 변경 서비스
    @Transactional
    public void changePassword(String urId, UserPwChangeDTO dto) {
        // urId로 사용자 조회
        User user = userRepository.findById(urId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 현재 비밀번호 검증 (암호화된 비밀번호와 비교)
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getUrPw())) {
            throw new RuntimeException("현재 비밀번호가 올바르지 않습니다.");
        }

        // 새 비밀번호와 새 비밀번호 확인이 일치하는지 검증
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new RuntimeException("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
        }

        // 새로운 비밀번호로 변경 (암호화하여 저장)
        user.changePassword(passwordEncoder.encode(dto.getNewPassword())); // 비밀번호를 암호화
        userRepository.save(user);
    }
    
    
    public String searchUserId(SearchIdDTO searchIdDTO) {
        String urId = userRepository.findUrIdByNameAndEmail(searchIdDTO.getName(), searchIdDTO.getEmail());
        return urId; // 해당하는 urId가 없으면 null 반환
    }
	
    
    public String generateTempPassword(String urId, String urEml) {
        User user = userRepository.findByUrIdAndUrEml(urId, urEml);
        if (user != null) {
            String tempPassword = createTempPassword();
            
            
            // 비밀번호를 암호화합니다.
            String encryptedPassword = passwordEncoder.encode(tempPassword);

            // 사용자 객체에 임시 비밀번호를 설정하고 DB에 저장
            user.changePassword(encryptedPassword);
            userRepository.save(user);
            
            return tempPassword;
        }
        return null;
    }

    private String createTempPassword() {
        String upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String digits = "0123456789";
        String combinedChars = upperCaseChars + digits;
        SecureRandom random = new SecureRandom();
        StringBuilder tempPassword = new StringBuilder();
        
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(combinedChars.length());
            tempPassword.append(combinedChars.charAt(index));
        }
        
        return tempPassword.toString();
    }
    
    // 아이디 중복 여부 확인
    public boolean isIdDuplicate(String urId) {
        return userRepository.existsByUrId(urId);
    }
    
    // 회원탈퇴
    @Transactional
    public boolean withdrawUser(String urId) {
        // 사용자 정보 삭제
        if (userRepository.existsByUrId(urId)) {
            userRepository.deleteByUrId(urId);
            return true;
        }
        return false; // 사용자가 존재하지 않으면 false 반환
    }
    
    // 비밀번호 확인 메서드
    public boolean chkPassword(String urId, String currentPassword) {
        User user = userRepository.findByUrId(urId);
        
        if (user != null) {
            return passwordEncoder.matches(currentPassword, user.getUrPw()); // urPw는 비밀번호 필드입니다.
        }
        return false;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 엔티티를 DTO로 변환하는 메서드
    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getUrId(),
            user.getUrNm(),
            user.getUrPhn(),
            user.getUrEml(),
            user.getUrPrplYn(), // 이 필드를 추가해야 합니다.
            user.getUrStmbplYn(), // 이 필드를 추가해야 합니다.
            user.getUrPw(), 
            user.getUrAuthCode(),
            user.getUrJoinDt(), // 이 필드를 추가해야 합니다.
            user.getUrConditionCode()
        );
    }
    
    public List<UserDTO> searchUserByName(String urNm) {
        List<User> users = userRepository.findByUrNm(urNm);
        return users.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
    }
    
    
    // 모든 사용자 정보를 DTO로 변환하는 메서드
    public List<UserDTO> getAllUsersAsDTO() {
        return getAllUsers().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

}
