package com.hub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hub.dto.ReserveDTO;
import com.hub.service.ReserveService;

@RestController
@RequestMapping("/api/reserves")
@CrossOrigin(origins = "http://localhost:3000")
public class ReserveController {

    private final ReserveService reserveService;

    @Autowired
    public ReserveController(ReserveService reserveService) {
        this.reserveService = reserveService;
    }

    // 예약 리스트 조회 API
    @GetMapping
    public ResponseEntity<List<ReserveDTO>> getAllReservations() {
        List<ReserveDTO> reservations = reserveService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    // 특정 예약 조회 API
    @GetMapping("/{rsNb}")
    public ResponseEntity<ReserveDTO> getReservationById(@PathVariable Long rsNb) {
        ReserveDTO reserve = reserveService.getReservationById(rsNb);
        return ResponseEntity.ok(reserve);
    }

    // 예약 생성 API
    @PostMapping
    public ResponseEntity<ReserveDTO> createReservation(@RequestBody ReserveDTO reserveDTO) {
        ReserveDTO createdReserve = reserveService.createReservation(reserveDTO);
        return ResponseEntity.ok(createdReserve);
    }

    // 예약 수정 API
    @PutMapping("/{rsNb}")
    public ResponseEntity<ReserveDTO> updateReservation(@PathVariable Long rsNb, @RequestBody ReserveDTO reserveDTO) {
        ReserveDTO updatedReserve = reserveService.updateReservation(rsNb, reserveDTO);
        return ResponseEntity.ok(updatedReserve);
    }

    // 예약 삭제 API
    @DeleteMapping("/{rsNb}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long rsNb) {
        reserveService.deleteReservation(rsNb);
        return ResponseEntity.noContent().build();
    }
}
