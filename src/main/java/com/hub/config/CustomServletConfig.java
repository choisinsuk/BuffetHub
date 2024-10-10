package com.hub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.hub.controller.formatter.LocalDateFormatter;

//스프링 컨텍스트에 의해 설정 파일로 사용된다는 것을 나타냄
@Configuration
public class CustomServletConfig implements WebMvcConfigurer 
{
	@Override
	public void addFormatters(FormatterRegistry registry) 
	{
		//FormatterRegistry를 사용하여 커스텀 포맷터를 등록, 데이터를 다양한 형식으로 변환하는 작업을 담당합니다.
		registry.addFormatter(new LocalDateFormatter());
	}

	@Override
	//날짜 포맷의 일관성을 유지하고, 외부 도메인에서의 요청을 관리하는 데 사용
	//관련 설정을 담당하는 메서드
	public void addCorsMappings(CorsRegistry registry) 
	{
		// 애플리케이션의 모든 경로에 대해 CORS 설정을 적용
		registry.addMapping("/**")
		// 모든 도메인에서 요청을 허용한다.
		.allowedOrigins("*")
		// 허용할 HTTP메서드 목록을 지정
		.allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS")
		// CORS 프리플라이트 요청의 캐시 시간을 30초로 설정한다.
		.maxAge(300)
		// 요청에 대해 허용할 헤더들을 명시
		.allowedHeaders("Authorization", "Cache-Control", "Content-Type");
	}
}