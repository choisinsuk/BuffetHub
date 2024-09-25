package com.hub.repository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hub.domain.BuffetVoucher;
import com.hub.domain.Reserve;
import com.hub.domain.User;

import lombok.extern.log4j.Log4j2;

@Log4j2
@SpringBootTest
public class ReserveRepositoryTests {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ReserveRepository reserveRepository;
	@Autowired
	private BuffetVoucherRepository buffetVoucherRepository;

	// 데이터 삽입 테스트
//	@Test
//	public void testInsert() {
//
//		// 현재시간 가져오기
//		LocalDateTime currentDateTime = LocalDateTime.now();
//		// Date로 변환
//		Date currentDate = Date.from(currentDateTime.atZone(ZoneId.systemDefault()).toInstant());
//
//		// 예시로 사용할 User와 Voucher생성
//		User user = User.builder().ur_id("testUser").ur_pw(passwordEncoder.encode("password1")).ur_nm("홍길동") // 이름
//				.ur_phn("01012345678") // 전화번호
//				.ur_eml("test@example.com") // 이메일
//				.ur_prpl_yn("1") // 개인정보 이용약관 동의 여부
//				.ur_stmbpl_yn("1") // 가게 회원 약관 동의 여부
//				.ur_join_dt(new Date()) // 회원가입 일자
//				.ur_condition_code("ACTIVE").ur_auth_code("testmem")// 회원 상태
//				.build();
//
//		// User 저장
//		userRepository.save(user);
//
//		LocalDateTime startDateTime = LocalDateTime.of(2024, 9, 25, 1, 30);
//		Date startTime = Date.from(startDateTime.atZone(ZoneId.systemDefault()).toInstant());
//
//		LocalDateTime endDateTime = startDateTime.plusHours(2);
//		Date endTime = Date.from(endDateTime.atZone(ZoneId.systemDefault()).toInstant());
//
//		BuffetVoucher buffetVoucher = BuffetVoucher.builder().bv_nb(21).bv_start_tm(startTime).bv_end_tm(endTime)
//				.build();
//
//		// BuffetVoucher 저장
//		buffetVoucherRepository.save(buffetVoucher);
//
//		Reserve reserve = Reserve.builder().rs_total_person_cnt(1).rs_adult_person_cnt(1).rs_child_person_cnt(0)
//				.rs_preage_person_cnt(0).rs_visit_adult_cnt(1).rs_visit_child_cnt(0).rs_visit_preage_cnt(0)
//				.rs_visit_total_cnt(1).rs_visit_yn(true).rs_payment_complete_yn(true).rs_realpeople_cnt(1).rs_nb(1)
//				.rs_dt(currentDate).user(user).voucher(buffetVoucher).build();
//
//		reserveRepository.save(reserve);
//
//	}

	// 데이터 조회 테스트
//	@Test
//	public void testRead() {
//		// 존재하는 번호로 확인
//		Long rs_nb = 23L;
//		Optional<Reserve> result = reserveRepository.findById(rs_nb);
//		Reserve reserve = result.orElseThrow();
//		log.info(reserve);
//		
//	}

	// 데이터 수정 테스트
//	@Test
//	public void textModify() {
//		
//		LocalDateTime startDateTime = LocalDateTime.of(2024, 11, 10, 15, 30);
//		Date reserveTime = Date.from(startDateTime.atZone(ZoneId.systemDefault()).toInstant());
//		Long rs_nb = 23L;
//		
//		Optional<Reserve> result = reserveRepository.findById(rs_nb);
//		
//		Reserve reserve = result.orElseThrow();
//		reserve.changeRs_adult_person_cnt(10);
//		reserve.changeRs_child_person_cnt(7);
//		reserve.changeRs_dt(reserveTime);
//		reserve.changeRs_payment_complete_yn(true);
//		reserve.changeRs_preage_person_cnt(5);
//		reserve.changeRs_visit_adult_cnt(6);
//		reserve.changeRs_visit_child_cnt(7);
//		reserve.changeRs_visit_preage_cnt(8);
//		reserve.changeRs_visit_yn(true);
//		
//		reserveRepository.save(reserve);
//	}

	// 데이터 삭제 테스트
	@Test
	public void testDelete() {
		Long rs_nb = 23L;

		reserveRepository.deleteById(rs_nb);
	}

}
