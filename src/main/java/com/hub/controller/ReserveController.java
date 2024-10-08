package com.hub.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.ReserveDTO;
import com.hub.service.ReserveService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/reserve")
public class ReserveController {

	private final ReserveService service;

	// 데이터 1개 읽어오기
	@GetMapping("/{rsNb}")
	public ReserveDTO get(@PathVariable(name = "rsNb") Long rsNb) {
		return service.get(rsNb);
	}

	// 데이터 리스트 읽어오기
	@GetMapping("/list")
	public PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);

		return service.list(pageRequestDTO);
	}

	// 데이터 등록하기
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody ReserveDTO reserveDTO) {
		log.info("@@@@@ReserveDTO: " + reserveDTO);

		Long rsNb = service.register(reserveDTO);

		return Map.of("rsNb", rsNb);
	}

	// 데이터 수정하기
	@PutMapping("/{rsNb}")
	public Map<String, String> modify(@PathVariable(name = "rsNb") Long rsNb, @RequestBody ReserveDTO reserveDTO) {
		reserveDTO.setRsNb(rsNb);
		log.info("Modify:" + reserveDTO);
		service.modify(reserveDTO);

		return Map.of("RESULT", "SUCCESS");
	}
	
	// 데이터 삭제하기
	@DeleteMapping("/{rsNb}")
	public Map<String, String> remove(@PathVariable(name = "rsNb") Long rsNb) {
		log.info("Remove: " + rsNb);
		service.remove(rsNb);
		
		return Map.of("RESULT","SUCCESS");
	}
	
	

}
