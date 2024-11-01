package com.hub.service;

import com.hub.dto.CustomerInquiryBoardDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;

import java.util.List;

// 고객 문의 서비스 인터페이스
public interface CustomerInquiryBoardService {

    // 모든 고객 문의를 조회
    List<CustomerInquiryBoardDTO> getAllInquiries(String role);

    // 특정 고객 문의를 ID와 역할에 따라 조회
    CustomerInquiryBoardDTO get(Long cqNb, String role, String usId);

    // 새로운 고객 문의를 생성
    CustomerInquiryBoardDTO createInquiry(CustomerInquiryBoardDTO inquiryDTO, String role);

    // 고객 문의를 수정
    void modify(CustomerInquiryBoardDTO inquiryDTO, String role, String usId);

    // 고객 문의를 삭제
    void remove(Long cqNb, String role, String usId);

    // 페이지 요청에 따라 고객 문의 리스트를 조회
    PageResponseDTO<CustomerInquiryBoardDTO> list(PageRequestDTO pageRequestDTO, String role);

    // 특정 고객 문의 ID가 존재하는지 확인
    boolean existsById(Long cqNb);
}
