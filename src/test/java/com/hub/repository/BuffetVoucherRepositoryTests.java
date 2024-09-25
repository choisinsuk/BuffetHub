package com.hub.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hub.domain.BuffetVoucher;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class BuffetVoucherRepositoryTests {

	@Autowired
	private BuffetVoucherRepository buffetVoucherRepository;
	
	// 데이터 삽입 테스트
//	@Test
//	public void testInsert() {
//		
//		for (Long i = 1L; i <= 10L; i++) {
//
//			BuffetVoucher buffetVoucher = BuffetVoucher.builder().bv_nb(i).
//					bv_start_tm(LocalDateTime.now()).bv_end_tm(LocalDateTime.now().plusHours(2))
//					.build();
//			
//			buffetVoucherRepository.save(buffetVoucher);
//					
//		}
//	}
	
	// 데이터 조회 테스트
	@Test
	public void testRead() {
		// 존재하는 번호로 확인
		Long bv_nb = 3L;
		Optional<BuffetVoucher> result = buffetVoucherRepository.findById(bv_nb);
		BuffetVoucher buffetVoucher = result.orElseThrow();
		log.info(buffetVoucher);
	}
}
