package com.hub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/hub/reserve")
public class ReserveController {
	
	private final ReserveService service;
	
	@GetMapping("/{rsNb}")
	public ReserveDTO get(@PathVariable(name = "rsNb") Long rsNb) {
		return service.get(rsNb);
	}
	
	@GetMapping("/list")
	public PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		
		return service.list(pageRequestDTO);
	}

}
