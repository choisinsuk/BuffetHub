package com.hub.controller;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/reserve")
public class ReserveController {

	private final ReserveService service;
	private final UserService userService; // UserService 주입
	private final UserRepository userRepository;

	 // 데이터 1개 읽어오기
	@GetMapping("/{rsNb}")
	public ReserveDTO get(@PathVariable(name = "rsNb") Long rsNb) {
		return service.get(rsNb);
	}

	// 데이터 리스트 읽어오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 임시 권한 
	@GetMapping("/list")
	public PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list@@@@@ : " +pageRequestDTO);

		return service.list(pageRequestDTO);
	}

	// 데이터 등록하기
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody ReserveDTO reserveDTO) {
		
		// 현재 로그인한 사용자의 ID 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String urId = ((UserDTO) authentication.getPrincipal()).getUrId(); // UserDTO에서 urId 가져옴
		
        // User 객체 조회
        User user = userRepository.findByUrId(urId); // UserRepository를 통해 User 객체를 가져옴
        if (user == null) {
            throw new RuntimeException("User with id " + urId + " not found");
        }
        
        // ReserveDTO에 유저 ID 설정
        reserveDTO.setUrId(urId);
        
        log.info("@@@@@ReserveDTO: " + reserveDTO);

		Long rsNb = service.register(reserveDTO);

		return Map.of("rsNb", rsNb);
	}

	// 데이터 수정하기
	@PutMapping("/{rsNb}")
	public Map<String, String> modify(@PathVariable(name = "rsNb") Long rsNb, @RequestBody ReserveDTO reserveDTO) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String userId = ((UserDTO) authentication.getPrincipal()).getUrId(); // UserDTO에서 urId 가져옴
        
		
		reserveDTO.setRsNb(rsNb);
		log.info("Modify:" + reserveDTO);
		service.modify(reserveDTO);

		return Map.of("RESULT", "SUCCESS");
	}
	
	// 데이터 삭제하기
	@DeleteMapping("/{rsNb}")
	public Map<String, String> remove(@PathVariable(name = "rsNb") Long rsNb) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = ((UserDTO) authentication.getPrincipal()).getUrId(); // UserDTO에서 urId 가져옴
		
		log.info("Remove: " + rsNb);
		service.remove(rsNb);
		
		return Map.of("RESULT","SUCCESS");
	}
	
	

}
