package com.hub.domain;

import java.util.Date;

import jakarta.persistence.*;
import lombok.*;
@Entity
@SequenceGenerator(name = "REVIEWBOARD_SEQ_GEN", // 시퀀스 제너레이터 이름
sequenceName = "REVIEWBOARD_SEQ", // 시퀀스 이름
initialValue = 1, // 시작 값
allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_reviewboard")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewBoard {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REVIEWBOARD_SEQ_GEN")
	@Column(name="rv_nb", nullable = false, precision = 8)
	private Integer rv_nb; // 후기번호
	@Column(name = "rv_title",nullable = false, length = 100)
	private String rv_title; // 제목
	@Column(name = "rv_ctt",nullable = false, length = 4000)
	private String rv_ctt; // 내용
	@Column(name = "rv_regdt",nullable = false)
	private Date rv_regdt; // 등록일자

	@Column(name="rv_comment_ctt", nullable = true, length = 4000)
	private String rv_comment_ctt; // 댓글내용(널 가능)
	@Column(name="rv_comment_writer_nm", nullable = true, length = 4000)
	private String rv_comment_writer_nm; // 댓글 작성자명(널 가능)
	@Column(name="rv_comment_regdt", nullable = true)
	private Date rv_comment_regdt; // 댓글 등록일자(널 가능)
	
	@Column(name="rv_pic", nullable = true, length = 1000)
	private String rv_pic; // 후기사진(널 가능) 
	
	@ManyToOne
	@JoinColumn(name = "rs_nb", nullable = false) // 외래 키 설정
	private Reserve reserve; // 예약번호
	
	@ManyToOne
	@JoinColumn(name = "ur_id", nullable = false) // 외래 키 설정
	private User user; 

}
