package com.hub.controller;

import com.hub.dto.CustomerInquiryBoardDTO;
import com.hub.service.CustomerInquiryBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 고객 문의 컨트롤러
@RestController
@RequestMapping("/api/inquiry")
public class CustomerInquiryBoardController {

    @Autowired
    private CustomerInquiryBoardService customerInquiryBoardService; // 서비스 클래스 주입

    // 모든 고객 문의 리스트 조회
    @GetMapping("/list")
    public ResponseEntity<List<CustomerInquiryBoardDTO>> getAllInquiries(Authentication authentication) {
        // role 가져오기
        String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
        List<CustomerInquiryBoardDTO> inquiries = customerInquiryBoardService.getAllInquiries(role);
        return ResponseEntity.ok(inquiries);
    }

    // 특정 고객 문의 조회
    @GetMapping("/{cqNb}")
    public ResponseEntity<CustomerInquiryBoardDTO> getInquiryById(@PathVariable Long cqNb, Authentication authentication) {
        String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
        String usId = authentication.getName(); // 로그인한 사용자의 ID 가져오기
        CustomerInquiryBoardDTO inquiry = customerInquiryBoardService.get(cqNb, role, usId);
        return ResponseEntity.ok(inquiry);
    }

    // 고객 문의 생성
    @PostMapping("/")
    public ResponseEntity<CustomerInquiryBoardDTO> createInquiry(@RequestBody CustomerInquiryBoardDTO inquiryDTO, Authentication authentication) {
        String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
        CustomerInquiryBoardDTO createdInquiry = customerInquiryBoardService.createInquiry(inquiryDTO, role);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInquiry);
    }

    // 고객 문의 수정
    @PutMapping("/{cqNb}")
    public ResponseEntity<String> updateInquiry(@PathVariable Long cqNb, @RequestBody CustomerInquiryBoardDTO inquiryDTO, Authentication authentication) {
        String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
        String usId = authentication.getName();
        customerInquiryBoardService.modify(inquiryDTO, role, usId);
        return ResponseEntity.ok("고객 문의가 성공적으로 수정되었습니다.");
    }

    // 고객 문의 삭제
    @DeleteMapping("/{cqNb}")
    public ResponseEntity<String> deleteInquiry(@PathVariable Long cqNb, Authentication authentication) {
        String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
        String usId = authentication.getName();
        customerInquiryBoardService.remove(cqNb, role, usId);
        return ResponseEntity.ok("고객 문의가 성공적으로 삭제되었습니다.");
    }
}
