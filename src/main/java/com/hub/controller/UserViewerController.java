package com.hub.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hub.domain.User;
import com.hub.dto.UserDTO;
import com.hub.service.UserService;

@RestController
@RequestMapping("/api/admin/UserView")
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class UserViewerController {
    
    @Autowired
    private UserService userService; // UserService 주입
    
    @PostMapping// POST 요청을 처리
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers(); // 모든 사용자 조회
            return ResponseEntity.ok(users); // 200 OK 응답 반환
        } catch (Exception e) {
            // 예외 발생 시 처리
            return ResponseEntity.status(500).body(null); // 500 Internal Server Error
        }
    }
    
 // 추가: 메뉴 이름으로 검색하는 엔드포인트
    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUser(@RequestParam("name") String urNm) {
        List<UserDTO> users = userService.searchUserByName(urNm);
        return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/{urId}")
    public ResponseEntity<String> deleteUser(@PathVariable String urId) {
        try {
            userService.deleteUser(urId);
            return ResponseEntity.ok("사용자가 삭제되었습니다."); // 성공 메시지 반환
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // 사용자 없음 오류 메시지 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류 발생"); // 일반적인 서버 오류 메시지 반환
        }
    }
}
