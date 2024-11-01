package com.hub.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.hub.dto.ReserveDTO;
import com.hub.service.AdminReserveService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController // RESTful 웹 서비스를 위한 컨트롤러 클래스 선언
@RequestMapping("/api/admin/reserves") // 기본 URL 매핑 설정
public class AdminReserveController {

    private final AdminReserveService reserveService; // 예약 관리 서비스를 주입 받기 위한 필드
    private static final Logger logger = LoggerFactory.getLogger(AdminReserveController.class); // 로그 출력을 위한 로거 설정

    @Autowired
    public AdminReserveController(AdminReserveService reserveService) {
        this.reserveService = reserveService; // 서비스 클래스 주입
    }

    @GetMapping // 모든 예약 정보를 조회하는 엔드포인트
    public ResponseEntity<List<ReserveDTO>> getAllReservations() {
        List<ReserveDTO> reservations = reserveService.getAllReservations(); // 모든 예약 조회
        return ResponseEntity.ok(reservations); // 조회된 예약 정보를 200 OK 상태로 반환
    }

    @GetMapping("/search/name") // 이름으로 예약을 검색하는 엔드포인트
    public ResponseEntity<List<ReserveDTO>> searchByName(@RequestParam("name") String rsNm) {
        if (rsNm == null || rsNm.trim().isEmpty()) {
            return ResponseEntity.badRequest().build(); // 요청 파라미터가 비어있을 경우 400 Bad Request 반환
        }
        try {
            List<ReserveDTO> reservation = reserveService.searchUserByName(rsNm); // 이름으로 예약 검색
            return ResponseEntity.ok(reservation); // 검색 결과를 200 OK 상태로 반환
        } catch (Exception e) {
            logger.error("Error occurred while searching by name: {}", e.getMessage()); // 에러 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 서버 에러 시 500 Internal Server Error 반환
        }
    }

    @GetMapping("/search/date") // 날짜로 예약을 검색하는 엔드포인트
    public ResponseEntity<List<ReserveDTO>> searchByDate(@RequestParam("date") LocalDate rsDt) {
        if (rsDt == null) {
            return ResponseEntity.badRequest().build(); // 요청 파라미터가 비어있을 경우 400 Bad Request 반환
        }
        List<ReserveDTO> reservation = reserveService.searchUserByDate(rsDt); // 날짜로 예약 검색
        return ResponseEntity.ok(reservation); // 검색 결과를 200 OK 상태로 반환
    }
    
    @DeleteMapping("/{reservationId}") // 예약 삭제를 위한 엔드포인트
    public ResponseEntity<Void> deleteReservation(@PathVariable Long reservationId) {
        reserveService.deleteReservation(reservationId); // 예약 삭제 실행
        return ResponseEntity.noContent().build(); // 삭제 성공 시 204 No Content 반환
    }
    
    @GetMapping("/totalCounts") // 예약된 총 인원을 조회하는 엔드포인트
    public ResponseEntity<Map<String, Integer>> getTotalPersonCounts() {
        Map<String, Integer> totalCounts = reserveService.getTotalPersonCounts(); // 총 인원 수 조회
        return ResponseEntity.ok(totalCounts); // 조회된 총 인원 수를 200 OK 상태로 반환
    }
    
}
