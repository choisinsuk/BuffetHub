package com.hub.domain;

import java.util.Date;

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
	private Long nt_num; // 공지사항 번호
	
	@Column(nullable = false)
	private String nt_title; // 공지사항 제목
	@Column(nullable = false)
	private String nt_ctt; // 공지사항 내용
	@Column(nullable = false)
	private Date nt_regdt; // 공지사항 등록일자
	
	private String nt_pic; // 공지사항 사진

}
