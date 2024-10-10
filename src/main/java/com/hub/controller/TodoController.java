package com.hub.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.TodoDTO;
import com.hub.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

// 이 컨트롤러는 TodoService와 상호작용하여 할 일(Todo) 관련 작업을 처리하는 REST API를 제공합니다.
// 클라이언트가 특정 할 일 정보를 조회하거나, 새로운 할 일을 등록하는 등의 작업을 수행할 수 있으며, 이 모든 요청은 JSON 형식으로 처리됩니다

@RestController				// 이 클래스는 REST API를 위한 컨트롤러로 사용되며, 각 메서드는 JSON 형식의 데이터를 반환
@RequiredArgsConstructor	// Lombok 어노테이션으로, final 필드에 대해 자동으로 생성자를 생성한다. 여기서는 TodoService를 주입
@Log4j2						// 로그 기록을 위한 LOMBOK 어노테이션입니다. log.info() 등을 사용해 로그 메시지를 출력할 수 있습니다.
@RequestMapping("api/todo") // "api/todo" 경로 하위의 요청을 처리합니다. [ 매핑명이 /api/todo 로 매핑이 된다.]

//서비스 계층을 통해 데이터를 조회하고 저장한다.
public class TodoController 
{
	private final TodoService service;
	
	//(GET)메서드
	@GetMapping("/{tno}")
	public TodoDTO get(@PathVariable(name ="tno") Long tno) 
	{
		return service.get(tno);
	}
	
	//list 메서드
	@GetMapping("/list")
	//페이지 요청 정보를 받아 할 일 목록을 조회
	public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO )
	{
		log.info(pageRequestDTO);
		//페이지 정보(페이지 번호, 크기 등)를 포함한 객체를 서비스로 전달
		return service.list(pageRequestDTO);
	}
	
	//register 메서드
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody TodoDTO todoDTO)
	{
		log.info("TodoDTO : ",todoDTO);
		//클라이언트로부터 JSON 형식으로 전달된 할 일 데이터를 객체로 변환하여 서비스로 전달
		Long tno = service.register(todoDTO);
		
		return Map.of("TNO", tno);
	}
	
	
	@PutMapping("/{tno}")
	//PathVariable("tno") Long tno : 경로 변수로 클라이언트가 URL에 포함한 할 일 번호 부여.
	//@RequestBody TodoDTO todoDTO : 클라이언트가 PUT 요청으로 전송한 JSON 데이터를 TodoDTO 객체로 변환.
	public Map<String, String> modify(@PathVariable(name = "tno") Long tno, @RequestBody TodoDTO todoDTO)
	{
		todoDTO.setTno(tno);
		log.info("Modify: " + todoDTO);
		//서비스 계층의 modify 메서드를 호출하여 실제 수정 작업을 처리.
		service.modify(todoDTO);
		
		return Map.of("RESULT", "SUCCESS");
	}
	
	@DeleteMapping("/{tno}")
	public Map<String, String> remove( @PathVariable(name="tno") Long tno )
	{
		log.info("Remove: " + tno);
		service.remove(tno);
		
		return Map.of("RESULT", "SUCCESS");
	 }

}
/*	데이터 조회: 특정 할 일을 조회하거나 페이지 정보에 맞춘 할 일 목록을 조회.
	데이터 등록: 클라이언트에서 새로운 할 일을 등록.
	서비스 계층: 데이터 처리 및 비즈니스 로직은 TodoService에서 수행되며, 컨트롤러는 주로 요청을 받아서 서비스에 전달, 결과 반환.
*/