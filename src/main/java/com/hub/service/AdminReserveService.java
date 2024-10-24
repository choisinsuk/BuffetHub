package com.hub.service;

import java.time.LocalDate;
import java.util.List;
import com.hub.dto.ReserveDTO;

public interface AdminReserveService {
	List<ReserveDTO> getAllReservationsSortedByDate();
	
	List<ReserveDTO> searchUserByDate(LocalDate rsDt);
	
	List<ReserveDTO> searchUserByName(String rsNm);
	
	void deleteReservation(Long reservationId);
}