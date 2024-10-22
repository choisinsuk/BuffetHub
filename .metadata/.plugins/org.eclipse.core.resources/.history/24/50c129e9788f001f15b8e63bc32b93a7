package com.hub.service;

import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.ReserveDTO;

public interface ReserveService {

	// 데이터 삽입
	Long register(ReserveDTO reserveDTO);
	
	// 데이터 조회(단일)
	ReserveDTO get(Long rs_nb);
	
	// 데이터 수정
	void modify(ReserveDTO reserveDTO);
	
	// 데이터 삭제
	void remove(Long rs_nb);
	
	// 데이터 리스트 조회(페이징)
	PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO);
	
	// 진행중 예약 리스트 조회
    PageResponseDTO<ReserveDTO> activeReservationsList(PageRequestDTO pageRequestDTO);

    // 결제 완료된 예약 리스트 조회
    PageResponseDTO<ReserveDTO> paidReservationsList(PageRequestDTO pageRequestDTO);
	
}
