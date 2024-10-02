package com.hub.domain;



import java.time.LocalDateTime;

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
	@Column( nullable = false, columnDefinition = "NUMBER(8)")
	private Long rvNb; // 후기번호
	@Column(nullable = false, columnDefinition = "VARCHAR2(100)")
	private String rvTitle; // 제목
	@Column(nullable = false, columnDefinition = "VARCHAR2(4000)")
	private String rvCtt; // 내용
	@Column(nullable = false)
	private LocalDateTime rvRegdt; // 등록일자

	@Column( nullable = true, columnDefinition = "VARCHAR2(4000)")
	private String rvCommentCtt; // 댓글내용(널 가능)
	@Column( nullable = true, columnDefinition = "VARCHAR2(20)")
	private String rvCommentWriterNm; // 댓글 작성자명(널 가능)
	@Column( nullable = true)
	private LocalDateTime rvCommentRegdt; // 댓글 등록일자(널 가능)
	
	@Column( nullable = true, columnDefinition = "VARCHAR2(1000)")
	private String rvPic; // 후기사진(널 가능) 
	
	@ManyToOne
	@JoinColumn(name = "rs_nb", nullable = false) // 외래 키 설정
	private Reserve reserve; // 예약번호
	
	@ManyToOne
	@JoinColumn(name = "ur_id", nullable = false) // 외래 키 설정
	private User user; 

}
