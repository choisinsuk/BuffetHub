package com.hub.domain;



import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;
@Entity
@SequenceGenerator(name = "NOTICE_SEQ_GEN", // 시퀀스 제너레이터 이름
sequenceName = "NOTICE_SEQ", // 시퀀스 이름
initialValue = 1, // 시작 값
allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_notice")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTICE_SEQ_GEN")
	@Column( nullable = false, columnDefinition = "NUMBER(8)")
	private Long ntNb; // 공지사항 번호
	
	@Column(nullable = false, columnDefinition = "VARCHAR2(100)")
	private String ntTitle; // 공지사항 제목
	@Column(nullable = false, columnDefinition = "VARCHAR2(4000)")
	private String ntCtt; // 공지사항 내용
	@Column(nullable = false)
	private LocalDateTime ntRegdt; // 공지사항 등록일자
	
	@Column(nullable = true, columnDefinition = "VARCHAR2(1000)")
	private String ntPic; // 공지사항 사진(널 가능)

}
