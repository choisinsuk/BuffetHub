package com.hub.controller;	

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hub.dto.ReserveDTO;
import com.hub.service.AdminReserveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/admin/reserves")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminReserveController {

    private final AdminReserveService reserveService;
    private static final Logger logger = LoggerFactory.getLogger(AdminReserveController.class);

    @Autowired
    public AdminReserveController(AdminReserveService reserveService) {
        this.reserveService = reserveService;
    }

    @GetMapping
    public ResponseEntity<List<ReserveDTO>> getAllReservations() {
        List<ReserveDTO> reservations = reserveService.getAllReservationsSortedByDate();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<ReserveDTO>> searchByName(@RequestParam("name") String rsNm) {
        if (rsNm == null || rsNm.trim().isEmpty()) {
            return ResponseEntity.badRequest().build(); // 잘못된 요청
        }
        try {
            List<ReserveDTO> reservation = reserveService.searchUserByName(rsNm);
            return ResponseEntity.ok(reservation);
        } catch (Exception e) {
            logger.error("Error occurred while searching by name: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/search/date")
    public ResponseEntity<List<ReserveDTO>> searchByDate(@RequestParam("date") LocalDate rsDt) {
        if (rsDt == null) {
            return ResponseEntity.badRequest().build(); // 잘못된 요청
        }
        List<ReserveDTO> reservation = reserveService.searchUserByDate(rsDt);
        return ResponseEntity.ok(reservation);
    }
    
    @DeleteMapping("/{reservationId}") // 예약 삭제를 위한 엔드포인트
    public ResponseEntity<Void> deleteReservation(@PathVariable Long reservationId) {
        reserveService.deleteReservation(reservationId);
        return ResponseEntity.noContent().build(); // 삭제 성공 시 204 No Content 반환
    }
}
