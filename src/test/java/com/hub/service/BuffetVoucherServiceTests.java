package com.hub.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hub.dto.BuffetVoucherDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class BuffetVoucherServiceTests {

	@Autowired
	private BuffetVoucherService buffetVoucherService;
	
	// 데이터 삽입 테스트
	@Test
	public void testRegister() {
		// 시작시간 설정(년,월,일,시,분)
		LocalDateTime startDateTime = LocalDateTime.of(2024, 11, 1, 10, 30);
		
		// 종료시간 설정(시작 시간에 2시간 추가)
		LocalDateTime endDateTime = startDateTime.plusHours(2);
		
		BuffetVoucherDTO buffetVoucherDTO = BuffetVoucherDTO.builder()
				.bvStartTm(startDateTime).bvEndTm(endDateTime).build();
		
		Long bvNb = buffetVoucherService.register(buffetVoucherDTO);
		log.info("bv_nb: " + bvNb);
	}
	
	// 데이터 조회 테스트
//	@Test
//	public void testGet() {
//		Long bv_nb = 84L;
//		
//		BuffetVoucherDTO buffetVoucherDTO = buffetVoucherService.get(bv_nb);
//		log.info(buffetVoucherDTO);
//	}
}
