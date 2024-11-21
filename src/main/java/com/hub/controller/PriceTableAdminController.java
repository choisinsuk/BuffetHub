package com.hub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hub.dto.PriceTableDTO;
import com.hub.service.PriceTableAdminService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/admin/prices")
@CrossOrigin(origins = "http://localhost:3000")
public class PriceTableAdminController {

    private final PriceTableAdminService priceTableService;

    // 생성자 주입
    public PriceTableAdminController(PriceTableAdminService priceTableService) {
        this.priceTableService = priceTableService;
    }

    // 가격 정보를 조회하는 엔드포인트
    @GetMapping
    public ResponseEntity<PriceTableDTO> getPrices() {
        PriceTableDTO priceTable = priceTableService.getPriceTable();
        return priceTable != null ? 
        		ResponseEntity.ok(priceTable) : ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<PriceTableDTO> 
    		updatePriceTable(@PathVariable Long id, @Valid @RequestBody PriceTableDTO priceTableDTO) 
    {
        PriceTableDTO updatedPriceTable = priceTableService.updatePriceTable(id, priceTableDTO);
        if (updatedPriceTable != null) {
            return ResponseEntity.ok(updatedPriceTable); // 성공적으로 업데이트된 가격 정보를 반환
        }
        return ResponseEntity.notFound().build(); // 가격 정보가 존재하지 않을 경우 404 반환
    }
}