package com.hub.entity;

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

	// 수정 가능한 부분은 변경이 가능하게 수정
	public void changeTitle(String title) {
		this.title = title;
	}
	public void changeComplete(boolean complete)
	{
		this.complete = complete;
	}
	public void changeDueDate(LocalDate dueDate)
	{
		this.dueDate = dueDate;
	}
}
// JPA는 엔티티 객체를 사용해서 데이터3베이스와 애플리케이션 사이에 데이터를 동기화하고 관리한다.
// 엔티티 객체를 생성하기 위해서는 엔티티 클래스를 생성하는데 이를 위해서 domain 패키지를 추가한다.