package com.hub.controller.formatter;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import org.springframework.format.Formatter;

// 객체의 포맷팅을 위한 커스텀 포매터 클래스. 입력 데이터를 특정 형식으로 변환하거나, 객체를 문자열로 출력할 때 사용
// 이 코드는 날짜 형식을 문자열로 받기 위한 클래스
public class LocalDateFormatter implements Formatter<LocalDate>
{
	@Override
	//LocalDate 객체를 지정된 형식의 문자열로 변환.
	public String print(LocalDate object, Locale locale)
	{
		//LocalDate.of(2024, 9, 26)이 주어지면 "2024-09-26"이라는 문자열을 반환.
		return DateTimeFormatter.ofPattern("yyyy-MM-dd").format(object);
	}

	@Override
	// 주어진 문자열을 LocalDate 객체로 변환.
	public LocalDate parse(String text, Locale locale) throws ParseException 
	{
		//DateTimeFormatter.ofPattern("yyyy-MM-dd")를 사용하여 문자열을 LocalDate로 파싱하고 그 결과를 반환
		return LocalDate.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	}
}
