package com.hub.service;

import java.time.LocalDateTime;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hub.domain.User;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.ReserveDTO;
import com.hub.repository.UserRepository;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReserveServiceTests {

	@Autowired
	private ReserveService reserveService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	// 데이터 삽입 테스트
	@Test
	public void testRegister() {
		

		// 예시로 사용할 User와 Voucher생성
		User user = User.builder().urId("testUser").urPw(passwordEncoder.encode("password1")).urNm("홍길동") // 이름
				.urPhn("01012345678") // 전화번호
				.urEml("test@example.com") // 이메일
				.urPrplYn("1") // 개인정보 이용약관 동의 여부
				.urStmbplYn("1") // 가게 회원 약관 동의 여부
				.urJoinDt(new Date()) // 회원가입 일자
				.urConditionCode("ACTIVE").urAuthCode("testmem")// 회원 상태
				.build();
		
		// User 저장
		userRepository.save(user);
		
		
		ReserveDTO reserveDTO = ReserveDTO.builder()
				.rsAdultPersonCnt(1)
				.rsChildPersonCnt(0)
				.rsPaymentCompleteYn(false)
				.rsPreagePersonCnt(0)
				.rsRealpeopleCnt(1)
				.rsTotalPersonCnt(1)
				.rsVisitAdultCnt(0)
				.rsVisitChildCnt(0)
				.rsVisitPreageCnt(0)
				.rsVisitTotalCnt(1)
				.rsVisitYn(false)
				.rsDt(LocalDateTime.now())
				.urId(user.getUrId())
				.bvNb(101L).build();
		
		Long rs_nb = reserveService.register(reserveDTO);
		log.info("rs_nb: " + rs_nb);
	}
	
	// 데이터 조회 테스트
//	@Test
//	public void testGet() {
//		Long rs_nb = 61L;
//		ReserveDTO reserveDTO = reserveService.get(rs_nb);
//		log.info(reserveDTO);
//	}
	
	// 데이터 리스트 조회(페이징)
//	@Test
//	public void testList() {
//		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(2)
//				.size(10).build();
//		
//		PageResponseDTO<ReserveDTO> response = reserveService.list(pageRequestDTO);
//		log.info(response);
//	}
	
}
