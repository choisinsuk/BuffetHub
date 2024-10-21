package com.hub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.dto.PriceTableDTO;
import com.hub.service.PriceTableAdminService;

@RestController
@RequestMapping("/api/admin/prices")
@CrossOrigin(origins = "http://localhost:3000")
public class PriceTableAdminController {

	//의존성 주입
	@Autowired
    private PriceTableAdminService priceTableService;
	
	//생성자 주입
	public PriceTableAdminController(PriceTableAdminService priceTableService)
	{
		this.priceTableService = priceTableService;
	}

	//가격 정보를 조회하는 엔드포인트
	@PostMapping
	// 가격 정보를 담은 리스트를 JSON으로 반환한다.
	// ResponseEntity : HTTP 상태 코드와 함께 응답을 제어할 수 있는 객체
	public ResponseEntity<PriceTableDTO> getPrices()
	{
		//HTTP 응답정보로 200 OK를 반환한다.
		return ResponseEntity.ok(priceTableService.getPriceTable());
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<Void> updatePriceTable(@PathVariable Long id, @RequestBody PriceTableDTO priceTableDTO) {
        priceTableService.updatePriceTable(id, priceTableDTO);
        return ResponseEntity.noContent().build();
    }
}