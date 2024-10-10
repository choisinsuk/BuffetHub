package com.hub.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.TodoDTO;
import com.hub.entity.Todo;
import com.hub.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자 자동 주입
public class TodoServiceImpl implements TodoService 
{
	//자동 주입 대상은 final로 삽입
	private final ModelMapper modelMapper;
	private final TodoRepository todoRepository;

	@Override
	public Long register(TodoDTO todoDTO) {
		log.info(".........");
		Todo todo = modelMapper.map(todoDTO, Todo.class);
		Todo savedTodo = todoRepository.save(todo);
		return savedTodo.getTno();
	}

	//조회 서비스 추가
	@Override
	public TodoDTO get(Long tno) {
		java.util.Optional<Todo> result = todoRepository.findById(tno);
		Todo todo = result.orElseThrow();
		TodoDTO dto = modelMapper.map(todo, TodoDTO.class);
		return dto;
	}

	//수정 서비스 추가
	@Override
	//TodoDTO : 수정할 데이터가 포함된 객체
	public void modify(TodoDTO todoDTO) 
	{
		//todoDTO에서 tno(할 일의 고유 번호)를 가져와서 해당 tno에 해당하는 Todo 엔티티를 데이터베이스에서 조회한다.
		//findById는 주어진 ID에 해당하는 데이터를 찾지 못할 경우 null을 반환할 수 있기 때문에, 그 가능성을 처리하기 위해 Optional로 감싸서 반환한다.
		Optional<Todo> result = todoRepository.findById(todoDTO.getTno());
		
		//Optional 객체인 result에서 값을 추출합니다. 만약 result가 비어 있으면(null일 경우), 예외를 던집니다.
		//해당 tno에 해당하는 할 일이 존재하지 않으면 오류를 발생시키는 방식
		Todo todo = result.orElseThrow();
		
		//필드 값 변경
		// TodoDTO의 새로운 값을 사용해 각 해당하는 항목을 변경
		todo.changeTitle(todoDTO.getTitle());
		todo.changeDueDate(todoDTO.getDueDate());
		todo.changeComplete(todoDTO.isComplete());
		
		//데이터 저장
		todoRepository.save(todo);
	}

	//삭제 서비스 추가
	@Override
	public void remove(Long tno) {
		todoRepository.deleteById(tno);
	}
	
	//페이지네이션 설정
	public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO)
	{
		// pageable : 스프링 데이터 JPA에서 페이지네이션을 처리하기 위한 객체
		// PageRequest.of(page, size, sort): 페이지 번호, 한 페이지의 크기, 그리고 정렬 기준을 사용해 Pageable 객체를 생성
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage()-1, pageRequestDTO.getSize(), Sort.by("tno").descending());
		
		// ageable을 사용해 todoRepository에서 데이터를 페이지 단위로 조회합니다. 
		// 이때 조회된 데이터는 Page<Todo> 타입으로 반환. 
		// Page<Todo>는 조회된 Todo 엔티티와 페이지 정보(총 페이지 수, 총 아이템 수 등)를 함께 담고 있는 객체
		Page<Todo> result = todoRepository.findAll(pageable);
		
		// result.getContent(): 조회된 Todo 엔티티 리스트를 가져옵니다
		List<TodoDTO> dtoList = result.getContent()
				//각 Todo 엔티티를 TodoDTO로 변환합니다. modelMapper는 엔티티와 DTO 간의 매핑을 자동으로 처리해 주는 라이브러리
				.stream().map(todo ->modelMapper.map(todo, TodoDTO.class))
				//collect(Collectors.toList()): 변환된 TodoDTO 객체들을 리스트로 수집
				.collect(Collectors.toList());
		
		// result.getTotalElements(): 전체 아이템 개수를 가져옴. 이는 페이지 단위로 나뉘어 있더라도 전체 아이템 수를 반환.
		long totalCount = result.getTotalElements();
		
		// 빌더 패턴을 사용해 PageResponseDTO<TodoDTO> 객체를 생성합니다.
		PageResponseDTO<TodoDTO> responseDTO = PageResponseDTO
				.<TodoDTO>withAll()
				//TodoDTO 리스트
				.dtoList(dtoList)
				//페이징 요청 정보
				.pageRequestDTO(pageRequestDTO)
				//전체 아이템 개수
				.totalCount(totalCount)
				//withall()이라는 커스텀 빌더 메서드를 통해 객체를 유연하게 설정하거, build()로 최종 객체를 만든다.
				.build();
		
		//PageResponseDTO<TodoDTO> 객체를 반환
		return responseDTO;
	}
}
