package com.hub.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TodoDTO {

	
	//엔티티 객체는 단순한 자바의 인스턴스가 아니라 JPA를 통해서 관리되고 있는 객체이다. 따라서 실제 데이터를 서비스할 깨는 엔티티 객체의 내용물을 복사해서 DTO를 이용
	private Long tno;
	private String title;
	private String writer;
	private boolean complete;
	
	//Lombok의 기능 (@Data)을 활용해서 getter/setter를 생성하고 날짜는 화면에서 쉽게 처리하도록 Format을 이용해서 0000-00-00과 같은 포맷으로 구성한다.
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private LocalDate dueDate;
}
