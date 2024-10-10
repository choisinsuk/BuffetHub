package com.hub.service;
import java.util.List;
import com.hub.dto.PriceTableDTO;

public interface PriceTableService {
	
	// 여러 가격 레코드를 조회하는 서비스
	List<PriceTableDTO> getPrices();  // 평일과 주말 가격을 모두 조회
    // 가격을 수정하는 메서드
    void updatePrice(PriceTableDTO priceDTO);
}
