package com.hub.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity // JPA 엔티티 클래스임을 나타냄
@SequenceGenerator(
    name = "INQUIRY_SEQ_GEN", // 시퀀스 생성기 이름
    sequenceName = "INQUIRY_SEQ", // 사용할 시퀀스 이름
    initialValue = 1, // 시퀀스의 초기값
    allocationSize = 1 // 시퀀스 증가 크기
)
@Table(name = "tbl_customerinquiry") // 데이터베이스 테이블 이름 매핑
@Getter // Lombok을 사용해 Getter 생성
@Setter // Lombok을 사용해 Setter 생성
@Builder // Lombok을 사용해 빌더 패턴 제공
@AllArgsConstructor // 모든 필드를 포함하는 생성자 생성
@NoArgsConstructor  // 기본 생성자 생성
public class CustomerInquiryBoard {

    @Id // 기본 키 필드
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "INQUIRY_SEQ_GEN") // 시퀀스를 통해 ID 생성
    @Column(nullable = false, columnDefinition = "NUMBER(8)") // 데이터베이스 컬럼 설정
    private Long cqNb; // 문의 번호

    @Column(nullable = false, columnDefinition = "VARCHAR2(100)") // 제목 필드
    private String cqTitle; // 문의 제목

    @Column(nullable = false, columnDefinition = "VARCHAR2(4000)") // 내용 필드
    private String cqCtt; // 문의 내용

    @Column(name = "cq_answer_ctt", columnDefinition = "VARCHAR2(4000)")
    private String cqAnswerCtt; // 답변 내용

    @Column(name = "cq_answer_regdt")
    private LocalDateTime cqAnswerRegdt; // 답변 등록일자

    @Column(nullable = false) // 등록일자 필드
    private LocalDateTime cqRegdt; // 등록일자

    @Column(nullable = false, columnDefinition = "VARCHAR2(100)") // 회원 아이디 필드
    private String usId; // 회원 아이디

    // 문의 번호 수정 메서드
    public void changeCqNb(Long cqNb) {
        this.cqNb = cqNb;
    }

    // 문의 제목 수정 메서드
    public void changeCqTitle(String cqTitle) {
        this.cqTitle = cqTitle;
    }

    // 문의 내용 수정 메서드
    public void changeCqCtt(String cqCtt) {
        this.cqCtt = cqCtt;
    }

    // 등록일자 수정 메서드
    public void changeCqRegdt(LocalDateTime cqRegdt) {
        this.cqRegdt = cqRegdt;
    }

    // 회원 아이디 수정 메서드
    public void changeUsId(String usId) {
        this.usId = usId;
    }
}
