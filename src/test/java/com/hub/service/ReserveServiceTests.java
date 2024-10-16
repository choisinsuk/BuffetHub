package com.hub.service;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hub.domain.User;
import com.hub.domain.UserRole;
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
	
	@BeforeEach
    public void setUp() {
        // Mock 인증 설정
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        
        when(authentication.getName()).thenReturn("testuser9");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }
	
//	// 데이터 삽입 테스트
//	@Test
//	public void testRegister() {
//		
//
//		// 예시로 사용할 User생성
//		User user = User.builder().urId("testUser3").urPw(passwordEncoder.encode("password1")).urNm("홍길동") // 이름
//				.urPhn("01012345678") // 전화번호
//				.urEml("test@example.com") // 이메일
//				.urPrplYn("1") // 개인정보 이용약관 동의 여부
//				.urStmbplYn("1") // 가게 회원 약관 동의 여부
//				.urJoinDt(new Date()) // 회원가입 일자
//				.urConditionCode("ACTIVE")// 회원 상태
//				.urAuthCode(UserRole.USER)
//				.build();
//		
//		// User 저장
//		userRepository.save(user);
//		
//		
//		ReserveDTO reserveDTO = ReserveDTO.builder()
//				.rsAdultPersonCnt(1)
//				.rsChildPersonCnt(0)
//				.rsPaymentCompleteYn(false)
//				.rsPreagePersonCnt(0)
//				.rsTotalPersonCnt(1)
//				.rsVisitAdultCnt(0)
//				.rsVisitChildCnt(0)
//				.rsVisitPreageCnt(0)
//				.rsVisitTotalCnt(1)
//				.rsVisitYn(false)
//				.rsDt(LocalDateTime.of(2024, 9, 29, 8, 30))
//				.rsNm("홍길동")
//				.rsPhn("01012345678")
//				.urId(user.getUrId())
//				.rsSignificant(" ")
//				.build();
//		
//		Long rs_nb = reserveService.register(reserveDTO);
//		log.info("rs_nb: " + rs_nb);
//	}
	
	// 데이터 조회 테스트
//	@Test
//	public void testGet() {
//		Long rs_nb = 61L;
//		ReserveDTO reserveDTO = reserveService.get(rs_nb);
//		log.info(reserveDTO);
//	}
	
	 //데이터 리스트 조회(페이징)
	@Test
	public void testList() {
		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(2)
				.size(10).build();
		
		PageResponseDTO<ReserveDTO> response = reserveService.paidReservationsList(pageRequestDTO);
//		PageResponseDTO<ReserveDTO> response = reserveService.activeReservationsList(pageRequestDTO);
//		PageResponseDTO<ReserveDTO> response = reserveService.list(pageRequestDTO);
		log.info("@@@@Response" + response);
	}
	
}
