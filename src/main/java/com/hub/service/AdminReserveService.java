package com.hub.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.hub.dto.ReserveDTO;

public interface AdminReserveService {
	
	List<ReserveDTO> getAllReservations();
	
	List<ReserveDTO> searchUserByDate(LocalDate rsDt);
	
	List<ReserveDTO> searchUserByName(String rsNm);
	
	void deleteReservation(Long reservationId);
	
	//인원 수를 합산, 반환하는 메서드
	Map<String, Integer> getTotalPersonCounts();
	
	List<Object[]> getReservationData();
}