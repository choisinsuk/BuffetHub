package com.hub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.dto.PriceTableDTO;
import com.hub.service.PriceTableService;

@RestController
@RequestMapping("/api/prices")
@CrossOrigin(origins = "http://localhost:3000")
public class PriceTableController {

	//의존성 주입
	@Autowired
    private PriceTableService priceTableService;
	
	//생성자 주입
	public PriceTableController(PriceTableService priceTableService)
	{
		this.priceTableService = priceTableService;
	}

	//가격 정보를 조회하는 엔드포인트
	@GetMapping
	// 가격 정보를 담은 리스트를 JSON으로 반환한다.
	// ResponseEntity : HTTP 상태 코드와 함께 응답을 제어할 수 있는 객체
	public ResponseEntity<List<PriceTableDTO>> getPrices(){
		// 서비스의 getPrice()메서드를 호출하여 가격정보를 가져온다.
		List<PriceTableDTO> prices = priceTableService.getPrices();
		//HTTP 응답정보로 200 OK를 반환한다.
		return new ResponseEntity<>(prices, HttpStatus.OK);
	}
	
	// 가격 정보를 업데이트하는 엔드포인트
	// PutMapping : 프론트엔드에서 전달받은 데이터를 수정하는 데 사용
	@PutMapping
	//@RequestBody : HTTP 요청 본문에 담긴 JSON 데이터를 PriceTableDTO 객체로 변환하여 메서드의 매개변수로 전달 받음
    public ResponseEntity<String> updatePrice(@RequestBody PriceTableDTO priceTableDTO) {
        try {
            // 서비스에서 가격 정보를 업데이트
            priceTableService.updatePrice(priceTableDTO);
            return ResponseEntity.ok("가격 정보가 성공적으로 업데이트되었습니다.");
        } catch (RuntimeException e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("가격 정보를 업데이트하는데 실패했습니다.");
        }
    }
}