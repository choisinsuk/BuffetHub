package com.hub.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hub.domain.User;
import com.hub.dto.SearchIdDTO;
import com.hub.dto.SearchPwDTO;
import com.hub.dto.UserChkPwDTO;
import com.hub.dto.UserDTO;
import com.hub.dto.UserJoinDTO;
import com.hub.dto.UserModifyDTO;
import com.hub.dto.UserPwChangeDTO;
import com.hub.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user") // API 기본 URL 설정
@RequiredArgsConstructor // 필수(final 또는 @NonNull로 선언된) 필드들만을 파라미터로 갖는 생성자를 자동으로 생성
public class UserController {

	private final UserService userService; // UserService 의존성 주입
	private final PasswordEncoder passwordEncoder;

	// 회원가입 요청 처리
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerUser(@Valid @RequestBody UserJoinDTO userJoinDTO) {

		Map<String, Object> response = new HashMap<>();

		try {
			// UserJoinDTO를 기반으로 User 객체 생성
			User user = User.createUser(userJoinDTO, passwordEncoder);

			// UserService를 사용해 사용자 저장
			userService.saveUser(user);

			// 회원가입 성공 시 성공 메시지와 성공 여부 반환
			response.put("success", true);
			response.put("message", "회원가입이 성공적으로 완료되었습니다.");
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			// 회원가입 중 예외 발생 시 실패 메시지와 실패 여부 반환
			response.put("success", false);
			response.put("message", "회원가입 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	// 사용자 프로필 조회
	@GetMapping("/profile/{urId}")
	public User getUserProfile(@PathVariable String urId) {
		return userService.getUserById(urId);
	}
	
    // 사용자 프로필 수정
    @PutMapping("/profileupdate/{urId}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String urId, @RequestBody UserModifyDTO dto) {
        userService.modify(dto, urId);
        return ResponseEntity.ok("사용자 정보가 성공적으로 수정되었습니다.");
    }
    
 // 비밀번호 변경
    @PutMapping("/change-password/{urId}")
    public ResponseEntity<String> changePassword(@PathVariable String urId, @RequestBody UserPwChangeDTO dto) {
        // 비밀번호 변경 서비스 호출
        userService.changePassword(urId, dto);
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }
    
    //아이디 찾기
    @PostMapping("/search/id")
    public ResponseEntity<String> searchId(@RequestBody SearchIdDTO searchIdDTO) {
        String urId = userService.searchUserId(searchIdDTO);
        if (urId != null) {
            return ResponseEntity.ok(urId); // urId가 존재하는 경우
        } else {
            return ResponseEntity.status(404).body("User not found"); // 해당 사용자가 없을 경우
        }
    }
    
    // 비밀번호 찾기
    @PostMapping("/search/password")
    public ResponseEntity<String> findPassword(@RequestBody SearchPwDTO searchPwDTO) {
        String tempPassword = userService.generateTempPassword(searchPwDTO.getUrId(), searchPwDTO.getUrEml());
        if (tempPassword != null) {
            return ResponseEntity.ok(tempPassword);
        } else {
            return ResponseEntity.badRequest().body("사용자를 찾을 수 없습니다.");
        }
    }
    
    // 아이디 중복 확인 엔드포인트
    @GetMapping("/checkId/{urId}")
    public ResponseEntity<Boolean> checkIdDuplicate(@PathVariable String urId) {
        boolean isDuplicate = userService.isIdDuplicate(urId);
        if (isDuplicate) {
            return ResponseEntity.ok(true);  // 아이디 중복
        } else {
            return ResponseEntity.ok(false);  // 사용 가능한 아이디
        }
    }
    
    // 회원 탈퇴 엔드포인트
    @DeleteMapping("/withdraw/{urId}")
    public ResponseEntity<String> withdrawUser(@PathVariable String urId) {
        boolean isWithdrawn = userService.withdrawUser(urId);
        if (isWithdrawn) {
            return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("회원 탈퇴에 실패했습니다.");
        }
    }
    
    // 현재 비밀번호 확인 엔드포인트
    @PostMapping("/chk-password")
    public ResponseEntity<String> chkPassword(@RequestBody UserChkPwDTO userChkPwDTO) {
        String urId = userChkPwDTO.getUrId(); // userDTO에 urId를 추가하여 받아옴

        if (userService.chkPassword(urId, userChkPwDTO.getCurrentPassword())) {
            return ResponseEntity.ok("비밀번호가 확인되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("현재 비밀번호가 잘못되었습니다.");
        }
    }
    
    
}