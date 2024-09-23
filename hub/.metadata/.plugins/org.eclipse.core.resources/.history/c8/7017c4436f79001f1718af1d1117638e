package com.hub.domain;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@SequenceGenerator(name = "TODO_SEQ_GEN", // 시퀀스 제너레이터 이름
		sequenceName = "TODO_SEQ", // 시퀀스 이름
		initialValue = 1, // 시작값
		allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)

@Table(name = "tbl_todo")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TODO_SEQ_GEN")
	// 사용할 전략을 시퀀스로 선택, 식별자 생성기를 설정해 놓은 TODO_SEQ_GEN 으로 설정
	private Long tno;
	private String title;
	private String writer;
	private boolean complete;
	private LocalDate dueDate;
}
