package com.hub.repository;

import com.hub.domain.CustomerInquiryBoard;

import org.springframework.data.jpa.repository.JpaRepository;

// 고객 문의 리포지토리 인터페이스 (JPA 활용)
public interface CustomerInquiryBoardRepository extends JpaRepository<CustomerInquiryBoard, Long> {

}
