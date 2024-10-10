package com.hub.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RootConfig 
{
	@Bean
	public ModelMapper getMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setFieldMatchingEnabled(true)
				.setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
				.setMatchingStrategy(MatchingStrategies.LOOSE);
		return modelMapper;
	}
}

/*
 ModelMapper 라이브러리
 - 서비스 계층의 파라미터와 리턴 타입은 DTO를 이용하지만 내부적으로 엔티티 객체를 사용해야 하는 경우가 많기 때문에 
   [ DTO <-> Entity ] 처리를 수월하게 할 수 있는 ModelMapper를 활용하는 것이 편리하다.
 
 ->
 
 서비스 계층 구현
 TodoDTO 타입으로 파라미터나 리턴 타입을 처리한다. 그리고 TodoRepository로 Todo 엔티티 객체를 처리해야 하기 때문에
 ModelMapper로 간단하게 처리하는 방법을 사용한다. -> ServiceImpl
 
 */
 