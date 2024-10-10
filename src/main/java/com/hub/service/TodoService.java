package com.hub.service;

import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.TodoDTO;

public interface TodoService {
	
	Long register(TodoDTO todoDTO);
	//TodoDTO를 반환하는 조회용 메서드를 추가한다.
	TodoDTO get(Long tno);
	//TodoService에 수정 기능을 추가
	void modify(TodoDTO todoDTO);
	//TodoService에 삭제 기능을 추가
	void remove(Long tno);
	//목록 데이터의 처리는 pageRequestDTO 타입으로 파라미터를 처리하고, pageResponseDTO 타입을 리턴 타입으로 지정한다.
	PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO);
}
