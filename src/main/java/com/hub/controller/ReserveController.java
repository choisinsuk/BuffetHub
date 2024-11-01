package com.hub.controller;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.hub.domain.User;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.ReserveDTO;
import com.hub.dto.UserDTO;
import com.hub.repository.UserRepository;
import com.hub.service.ReserveService;
import com.hub.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController // RESTful 웹 서비스를 위한 컨트롤러 클래스 선언
@RequiredArgsConstructor // 생성자를 자동 생성하는 Lombok 어노테이션
@Log4j2 // 로그 출력을 위한 Lombok 어노테이션
@RequestMapping("/api/reserve") // 기본 URL 매핑 설정
public class ReserveController {

	private final ReserveService service; // 예약 서비스 주입
	private final UserService userService; // 사용자 서비스 주입
	private final UserRepository userRepository; // 사용자 레포지토리 주입

	// 예약 데이터 1개를 읽어오는 메서드
	@GetMapping("/{rsNb}")
	public ReserveDTO get(@PathVariable(name = "rsNb") Long rsNb) {
		return service.get(rsNb); // 예약 데이터를 ID를 통해 조회하여 반환
	}

	// 예약 리스트를 읽어오는 메서드
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // 권한 검사
	@GetMapping("/list")
	public PageResponseDTO<ReserveDTO> list(@RequestParam(name = "paid", required = false) Boolean paid,
	        PageRequestDTO pageRequestDTO) {

	    log.info("List request with paid filter: " + paid);

	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 현재 인증 정보 가져오기
	    String userRole = authentication.getAuthorities().stream().findFirst().map(GrantedAuthority::getAuthority)
	            .orElse(""); // 사용자 권한 가져오기

	    if ("ROLE_ADMIN".equals(userRole)) {
	        // 관리자는 모든 예약 리스트를 가져옵니다.
	        return service.list(pageRequestDTO);
	    } else {
	        // 일반 사용자는 paid 파라미터에 따라 다른 리스트를 반환합니다.
	        if (Boolean.TRUE.equals(paid)) {
	        	log.info("@@PaidList:" + service.paidReservationsList(pageRequestDTO));
	            return service.paidReservationsList(pageRequestDTO); // 결제된 예약 리스트 반환
	        } else {
	            return service.activeReservationsList(pageRequestDTO); // 활성 예약 리스트 반환
	        }
	    }
	}

	// 예약 데이터 등록 메서드
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody ReserveDTO reserveDTO) {

		// 현재 로그인한 사용자의 ID 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String urId = ((UserDTO) authentication.getPrincipal()).getUrId(); // UserDTO에서 urId 가져옴

		// User 객체 조회
		User user = userRepository.findByUrId(urId); // UserRepository를 통해 User 객체를 가져옴
		if (user == null) {
			throw new RuntimeException("User with id " + urId + " not found"); // 사용자가 없을 시 예외 발생
		}

		// ReserveDTO에 유저 ID 설정
		reserveDTO.setUrId(urId);

		log.info("@@@@@ReserveDTO: " + reserveDTO);

		Long rsNb = service.register(reserveDTO); // 예약 등록 후 생성된 예약 ID 반환

		return Map.of("rsNb", rsNb); // 예약 ID를 Map 형태로 반환
	}

	// 예약 데이터 수정 메서드
	@PutMapping("/{rsNb}")
	public Map<String, String> modify(@PathVariable(name = "rsNb") Long rsNb, @RequestBody ReserveDTO reserveDTO) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userId = ((UserDTO) authentication.getPrincipal()).getUrId(); // UserDTO에서 urId 가져옴

		reserveDTO.setRsNb(rsNb); // 수정할 예약 ID 설정
		log.info("Modify:" + reserveDTO);
		service.modify(reserveDTO); // 예약 데이터 수정

		return Map.of("RESULT", "SUCCESS"); // 수정 결과를 SUCCESS로 반환
	}

	// 예약 데이터 삭제 메서드
	@DeleteMapping("/{rsNb}")
	public Map<String, String> remove(@PathVariable(name = "rsNb") Long rsNb) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userId = ((UserDTO) authentication.getPrincipal()).getUrId(); // UserDTO에서 urId 가져옴

		log.info("Remove: " + rsNb);
		service.remove(rsNb); // 예약 삭제

		return Map.of("RESULT", "SUCCESS"); // 삭제 결과를 SUCCESS로 반환
	}
	
	// 예약자 인원수를 확인하는 API 메서드
	@GetMapping("/stats")
	public Map<String, Integer> getReservationStats() {
	    // 예약 통계를 가져옵니다.
	    Map<String, Integer> stats = service.getReservationStats();
	    return stats; // 통계 결과 반환
	}
}
