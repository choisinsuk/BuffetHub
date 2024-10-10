package com.hub.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hub.dto.ReserveDTO;
import com.hub.entity.Reserve;
import com.hub.repository.ReserveRepository;

@Service
public class ReserveServiceImpl implements ReserveService {

    private final ReserveRepository reserveRepository;
    private final ModelMapper modelMapper;

    //모든 예약 정보를 조회
    public ReserveServiceImpl(ReserveRepository reserveRepository, ModelMapper modelMapper) {
        this.reserveRepository = reserveRepository; 
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ReserveDTO> getAllReservations() {
        return reserveRepository.findAll()
                .stream()
                .map(reserve -> modelMapper.map(reserve, ReserveDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReserveDTO getReservationById(Long rsNb) {
        Reserve reserve = reserveRepository.findById(rsNb)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + rsNb));
        return modelMapper.map(reserve, ReserveDTO.class);
    }

    @Override
    public ReserveDTO createReservation(ReserveDTO reserveDTO) {
        Reserve reserve = modelMapper.map(reserveDTO, Reserve.class);
        Reserve savedReserve = reserveRepository.save(reserve);
        return modelMapper.map(savedReserve, ReserveDTO.class);
    }

    @Override
    public ReserveDTO updateReservation(Long rsNb, ReserveDTO reserveDTO) {
        Reserve existingReserve = reserveRepository.findById(rsNb)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + rsNb));
        
        // 필드 업데이트 (필요에 따라 변경)
        existingReserve.setRsDt(reserveDTO.getRsDt());
        existingReserve.setRsTotalPersonCnt(reserveDTO.getRsTotalPersonCnt());
        existingReserve.setRsAdultPersonCnt(reserveDTO.getRsAdultPersonCnt());
        existingReserve.setRsChildPersonCnt(reserveDTO.getRsChildPersonCnt());
        existingReserve.setRsPreagePersonCnt(reserveDTO.getRsPreagePersonCnt());
        existingReserve.setRsVisitAdultCnt(reserveDTO.getRsVisitAdultCnt());
        existingReserve.setRsVisitChildCnt(reserveDTO.getRsVisitChildCnt());
        existingReserve.setRsVisitPreageCnt(reserveDTO.getRsVisitPreageCnt());
        existingReserve.setRsVisitTotalCnt(reserveDTO.getRsVisitTotalCnt());
        existingReserve.setRsVisitYn(reserveDTO.getRsVisitYn());
        existingReserve.setRsPaymentCompleteYn(reserveDTO.getRsPaymentCompleteYn());
        existingReserve.setBvNb(reserveDTO.getBvNb());
        existingReserve.setUrId(reserveDTO.getUrId());
        
        Reserve updatedReserve = reserveRepository.save(existingReserve);
        return modelMapper.map(updatedReserve, ReserveDTO.class);
    }

    @Override
    public void deleteReservation(Long rsNb) {
        if (!reserveRepository.existsById(rsNb)) {
            throw new IllegalArgumentException("Reservation not found with id: " + rsNb);
        }
        reserveRepository.deleteById(rsNb);
    }
}
