package com.hub.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;


// 고객 문의 DTO 클래스
@Getter
@Setter
public class CustomerInquiryBoardDTO {

    private Long cqNb; // 고객 문의 번호

    private String usId; // 회원 아이디

    private String cqTitle; // 고객 문의 제목

    private String cqCtt; // 고객 문의 내용

    private LocalDateTime cqRegdt; // 고객 문의 등록 일자

    private String cqAnswerCtt; // 고객 문의 답변 내용

    private LocalDateTime cqAnswerRegdt; // 고객 문의 답변 등록 일자

}
