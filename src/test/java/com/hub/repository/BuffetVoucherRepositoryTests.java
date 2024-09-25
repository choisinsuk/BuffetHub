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
//		for (Integer i = 1; i <= 10; i++) {
//			
//			// 시작시간 설정(년,월,일,시,분)
//			LocalDateTime startDateTime = LocalDateTime.of(2024, 9, 25, i, 30);
//			Date startTime = Date.from(startDateTime.atZone(ZoneId.systemDefault()).toInstant());
//
//			// 종료시간 설정(시작 시간에 2시간 추가)
//			LocalDateTime endDateTime = startDateTime.plusHours(2);
//			Date endTime = Date.from(endDateTime.atZone(ZoneId.systemDefault()).toInstant());
//			
//			BuffetVoucher buffetVoucher = BuffetVoucher.builder().bv_nb(i).
//					bv_start_tm(startTime).bv_end_tm(endTime).build();
//					
//			
//			buffetVoucherRepository.save(buffetVoucher);
//					
//		}
//	}
	
//	// 데이터 조회 테스트
//	@Test
//	public void testRead() {
//		// 존재하는 번호로 확인
//		Long bv_nb = 21L;
//		Optional<BuffetVoucher> result = buffetVoucherRepository.findById(bv_nb);
//		BuffetVoucher buffetVoucher = result.orElseThrow();
//		log.info(buffetVoucher);
//		
//	}
	
	// 데이터 수정 테스트
//	@Test
//	public void textModify() {
//		
//		LocalDateTime startDateTime = LocalDateTime.of(2024, 10, 26, 18, 00);
//		Date startTime = Date.from(startDateTime.atZone(ZoneId.systemDefault()).toInstant());
//		Long bv_nb = 27L;
//		
//		Optional<BuffetVoucher> result = buffetVoucherRepository.findById(bv_nb);
//		
//		BuffetVoucher buffetVoucher = result.orElseThrow();
//		buffetVoucher.changeStart_tm(startTime);
//		
//		buffetVoucherRepository.save(buffetVoucher);
//	}
	
	
	// 데이터 삭제 테스트
	@Test
	public void testDelete() {
		Long bv_nb = 28L;
		
		buffetVoucherRepository.deleteById(bv_nb);
	}
}
