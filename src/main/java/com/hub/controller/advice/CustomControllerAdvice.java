package com.hub.controller.advice;

import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// 모든 컨트롤러에서 발생하는 예외를 잡아내어 처리할 수 있는 어노테이션
// 예외 발생 시 공통적인 로직으로 처리하려고 할 때 사용
@RestControllerAdvice
public class CustomControllerAdvice 
{
	// 데이터베이스에서 찾으려는 요소가 존재하지 않을 때 발생
	@ExceptionHandler(NoSuchElementException.class)
	protected ResponseEntity<?> notExist(NoSuchElementException e)
	{
		String msg = e.getMessage();
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg",msg));
	}

	//요청 데이터를 검증할 때 유효성 검사가 실패하면 발생
	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<?> handleIllegalArgumentException(MethodArgumentNotValidException e) 
	{
		String msg = e.getMessage();
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("msg",msg));
	}
}