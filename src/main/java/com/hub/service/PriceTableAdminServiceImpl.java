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
        PriceTable priceTable = priceTableRepository.findById(1L).orElse(null);  // id가 1인 행을 가정
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
        return null;
    }

    @Override
    public void updatePriceTable(Long id, PriceTableDTO priceTableDTO) {
        PriceTable priceTable = priceTableRepository.findById(id).orElse(null);
        if (priceTable != null) {
            priceTable.setDayAdultPrice(priceTableDTO.getDayAdultPrice());
            priceTable.setDayChildPrice(priceTableDTO.getDayChildPrice());
            priceTable.setDayKidsPrice(priceTableDTO.getDayKidsPrice());
            priceTable.setWeekAdultPrice(priceTableDTO.getWeekAdultPrice());
            priceTable.setWeekChildPrice(priceTableDTO.getWeekChildPrice());
            priceTable.setWeekKidsPrice(priceTableDTO.getWeekKidsPrice());
            priceTableRepository.save(priceTable);
        }
    }
}