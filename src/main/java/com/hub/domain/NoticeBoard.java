package com.hub.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // 이 클래스가 JPA의 엔티티임을 나타냄
@SequenceGenerator(name = "NOTICE_SEQ_GEN", // 시퀀스 제너레이터 이름
        sequenceName = "NOTICE_SEQ", // 사용할 시퀀스 이름
        initialValue = 1, // 시퀀스의 시작값
        allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_notice") // 매핑할 데이터베이스 테이블 이름
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class NoticeBoard {

    @Id // 기본 키를 나타냄
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTICE_SEQ_GEN") // 시퀀스 전략으로 값 생성
    @Column(nullable = false, columnDefinition = "NUMBER(8)") // 데이터베이스 컬럼 정의
    private Long ntNb; // 공지번호

    @Column(nullable = false, columnDefinition = "VARCHAR2(100)") // 제목 컬럼 정의
    private String ntTitle; // 제목

    @Column(nullable = false, columnDefinition = "VARCHAR2(4000)") // 내용 컬럼 정의
    private String ntCtt; // 내용

    @Column(nullable = false) // 등록일자 컬럼 정의
    private LocalDateTime ntRegdt; // 등록일자
    public void changeNtTitle(String ntTitle) {
    	this.ntTitle = ntTitle;
}
    public void changeNtCtt(String ntCtt) {
    	this.ntCtt = ntCtt;
    }
    public void changeNtRegdt(LocalDateTime ntRegdt) {
    	this.ntRegdt = ntRegdt;
    }
}