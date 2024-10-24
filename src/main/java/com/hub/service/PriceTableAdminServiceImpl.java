package com.hub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hub.domain.PriceTable;
import com.hub.dto.PriceTableDTO;
import com.hub.repository.PriceTableAdminRepository;

@Service
public class PriceTableAdminServiceImpl implements PriceTableAdminService {

    @Autowired
    private PriceTableAdminRepository priceTableRepository;

    @Override
    public PriceTableDTO getPriceTable() {
        PriceTable priceTable = priceTableRepository.findById(1L).orElse(null); // id가 1인 행을 가정
        if (priceTable != null) {
            PriceTableDTO dto = new PriceTableDTO();
            dto.setDayAdultPrice(priceTable.getDayAdultPrice());
            dto.setDayChildPrice(priceTable.getDayChildPrice());
            dto.setDayKidsPrice(priceTable.getDayKidsPrice());
            dto.setWeekAdultPrice(priceTable.getWeekAdultPrice());
            dto.setWeekChildPrice(priceTable.getWeekChildPrice());
            dto.setWeekKidsPrice(priceTable.getWeekKidsPrice());
            return dto;
        }
        return null; // null일 경우 예외 처리가 필요할 수 있습니다.
    }

    @Override
    public PriceTableDTO updatePriceTable(Long id, PriceTableDTO priceTableDTO) {
        PriceTable priceTable = priceTableRepository.findById(id).orElse(null);
        if (priceTable != null) {
            priceTable.setDayAdultPrice(priceTableDTO.getDayAdultPrice());
            priceTable.setDayChildPrice(priceTableDTO.getDayChildPrice());
            priceTable.setDayKidsPrice(priceTableDTO.getDayKidsPrice());
            priceTable.setWeekAdultPrice(priceTableDTO.getWeekAdultPrice());
            priceTable.setWeekChildPrice(priceTableDTO.getWeekChildPrice());
            priceTable.setWeekKidsPrice(priceTableDTO.getWeekKidsPrice());
            priceTableRepository.save(priceTable);

            // 업데이트된 가격 정보를 DTO로 변환하여 반환
            PriceTableDTO updatedDTO = new PriceTableDTO();
            updatedDTO.setDayAdultPrice(priceTable.getDayAdultPrice());
            updatedDTO.setDayChildPrice(priceTable.getDayChildPrice());
            updatedDTO.setDayKidsPrice(priceTable.getDayKidsPrice());
            updatedDTO.setWeekAdultPrice(priceTable.getWeekAdultPrice());
            updatedDTO.setWeekChildPrice(priceTable.getWeekChildPrice());
            updatedDTO.setWeekKidsPrice(priceTable.getWeekKidsPrice());

            return updatedDTO; // 업데이트된 DTO 반환
        }
        return null; // null 또는 적절한 예외를 반환할 수 있습니다.
    }
}