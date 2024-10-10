package com.hub.service;

import java.util.List;
import com.hub.dto.ReserveDTO;

public interface ReserveService {
    List<ReserveDTO> getAllReservations();
    ReserveDTO getReservationById(Long rsNb);
    ReserveDTO createReservation(ReserveDTO reserveDTO);
    ReserveDTO updateReservation(Long rsNb, ReserveDTO reserveDTO);
    void deleteReservation(Long rsNb);
}
