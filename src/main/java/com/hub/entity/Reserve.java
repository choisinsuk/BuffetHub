package com.hub.entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

//어노테이션
@Data
@Entity // 엔티티 클래스: 데이터베이스의 테이블 구조를 자바 클래스 형태로 매핑하는 역할을 한다.
@Table(name = "TBL_RESERVE") // 매핑할 클래스 이름
public class Reserve {

    @Id // 기본 키 필드 지정
    // 자동 증가 설정 (IDENTITY 전략 사용)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsNb; // 예약번호 (PK)

    @Column(name = "RS_DT", nullable = false) // 예약일자 (NOT NULL)
    private LocalDate rsDt; // 예약일자

    @Column(name = "RS_TOTAL_PERSON_CNT", nullable = false) // 예약 총 인원수 (NOT NULL)
    private Integer rsTotalPersonCnt; // 예약 총 인원수

    @Column(name = "RS_ADULT_PERSON_CNT", nullable = false) // 예약 성인 인원수 (NOT NULL, DEFAULT 1)
    private Integer rsAdultPersonCnt = 1; // 예약 성인 인원수, 기본값 1

    @Column(name = "RS_CHILD_PERSON_CNT", nullable = false) // 예약 아동 인원수 (NOT NULL)
    private Integer rsChildPersonCnt; // 예약 아동 인원수

    @Column(name = "RS_PREAGE_PERSON_CNT", nullable = false) // 예약 미취학 인원수 (NOT NULL)
    private Integer rsPreagePersonCnt; // 예약 미취학 인원수

    @Column(name = "RS_VISIT_ADULT_CNT", nullable = false) // 방문 성인 인원수 (NOT NULL)
    private Integer rsVisitAdultCnt; // 방문 성인 인원수

    @Column(name = "RS_VISIT_CHILD_CNT", nullable = false) // 방문 아동 인원수 (NOT NULL)
    private Integer rsVisitChildCnt; // 방문 아동 인원수

    @Column(name = "RS_VISIT_PREAGE_CNT", nullable = false) // 방문 미취학 인원수 (NOT NULL)
    private Integer rsVisitPreageCnt; // 방문 미취학 인원수

    @Column(name = "RS_VISIT_TOTAL_CNT", nullable = false) // 방문 총 인원수 (NOT NULL)
    private Integer rsVisitTotalCnt; // 방문 총 인원수

    @Column(name = "RS_VISIT_YN", nullable = false) // 방문 여부 (NOT NULL, 1은 TRUE, 0은 FALSE)
    private Integer rsVisitYn; // 방문 여부

    @Column(name = "RS_PAYMENT_COMPLETE_YN", nullable = false) // 결제 완료 여부 (NOT NULL, 1은 TRUE, 0은 FALSE)
    private Integer rsPaymentCompleteYn; // 결제 완료 여부

    @Column(name = "BV_NB") // 식사권 번호 (FK)
    private Long bvNb; // 식사권 번호

    @Column(name = "UR_ID", nullable = false) // 사용자 ID (FK, NOT NULL)
    private String urId; // 사용자 ID

}
//-> 레포지토리로 이동