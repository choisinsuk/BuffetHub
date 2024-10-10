package com.hub.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hub.dto.PriceTableDTO;
import com.hub.entity.PriceTable;
import com.hub.repository.PriceTableRepository;

@Service
public class PriceTableServiceImpl implements PriceTableService {

	// 의존성 주입 : 인터페이스 타입의 객체를 담기 위한 변수
    // final 키워드를 사용하여 객체가 한번 초기화되면 이후 변경할 수 없도록 합니다.
	private final PriceTableRepository priceTableRepository;

    // ServiceImpl생성자는 Repository를 인자로 받아서 해당 구문을 필드에 할당합니다.
	// 이 클래스가 생성될 때 Repository 객채를 자동으로 주입하게 되며, 이후 이 필드를 통해 DB작업을 할 수 있다.
    public PriceTableServiceImpl(PriceTableRepository priceTableRepository) {
        this.priceTableRepository = priceTableRepository;
    }

    // 데이터베이스에서 모든 가격 정보를 조회하고, 이를 DTO객체의 리스트로 변환하여 반환한다.
    @Override
    public List<PriceTableDTO> getPrices() {
        
    	// Repository의 findAll() 메서드는 데이터베이스에서 엔티티에 해당하는 모든 데이터를 가져온다.
        List<PriceTable> priceTables = priceTableRepository.findAll();
        
        // PriceTable 엔티티를 PriceTableDTO로 변환한 후 List로 반환합니다.
        return priceTables.stream() //list를 스트림으로 변환하여 함수형 프로그래밍 방식으로 데이터를 처리하게한다.
                          .map(this::convertToDTO) // 각 엔티티 객체를 convertToDTO 메서드를 이용해 DTO로 변환한다.
                          .collect(Collectors.toList()); // 스트립의 결과를 다시 리스트로 변환한다.
    }

    // DTO객체를 사용하여 데이터베이스의 가격 정보를 수정한다.
    @Override
    public void updatePrice(PriceTableDTO priceTableDTO) 
    {
        // findById(1L) 은 repository의 메서드로 ID가 1인 price객체를 조회한다.
        PriceTable priceTable = priceTableRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("가격 정보를 찾을 수 없음"));

        // 평일 및 주말 가격을 수정합니다.
        //set을 통해 각각의 필드를 수정한다.
        //priceTableDTO로부터 DayAdultPrice 값을 가져와 priceTable 객체의 DayAdultPrice 속성을 설정해주는 역할
        priceTable.setDayAdultPrice(priceTableDTO.getDayAdultPrice());
        priceTable.setDayChildPrice(priceTableDTO.getDayChildPrice());
        priceTable.setDayKidsPrice(priceTableDTO.getDayKidsPrice());
        priceTable.setWeekAdultPrice(priceTableDTO.getWeekAdultPrice());
        priceTable.setWeekChildPrice(priceTableDTO.getWeekChildPrice());
        priceTable.setWeekKidsPrice(priceTableDTO.getWeekKidsPrice());

        // 수정된 내용을 저장합니다.
        priceTableRepository.save(priceTable);
    }

    // PriceTable 엔티티를 PriceTableDTO로 변환하여 반환합니다.
    // PriceTableDTO는 PriceTable 엔티티의 데이터를 담기 위한 객체
    // 엔티티에서 데이터를 DTO로 변환하여 클라이언트(프론트엔드)로 전송할 때 사용
    private PriceTableDTO convertToDTO(PriceTable priceTable) {
        PriceTableDTO priceTableDTO = new PriceTableDTO();
        priceTableDTO.setDayAdultPrice(priceTable.getDayAdultPrice());
        priceTableDTO.setDayChildPrice(priceTable.getDayChildPrice());
        priceTableDTO.setDayKidsPrice(priceTable.getDayKidsPrice());
        priceTableDTO.setWeekAdultPrice(priceTable.getWeekAdultPrice());
        priceTableDTO.setWeekChildPrice(priceTable.getWeekChildPrice());
        priceTableDTO.setWeekKidsPrice(priceTable.getWeekKidsPrice());
        return priceTableDTO;
    }
}
