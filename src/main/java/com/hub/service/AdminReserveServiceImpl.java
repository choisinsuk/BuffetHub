package com.hub.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.hub.domain.Reserve;
import com.hub.dto.ReserveDTO;
import com.hub.repository.AdminReserveRepository;

import jakarta.transaction.Transactional;

@Service
public class AdminReserveServiceImpl implements AdminReserveService {

    private final AdminReserveRepository reserveRepository;
    private final ModelMapper modelMapper;

    //유저 목록 조회
    public AdminReserveServiceImpl(AdminReserveRepository reserveRepository, ModelMapper modelMapper) {
        this.reserveRepository = reserveRepository; 
        this.modelMapper = modelMapper;
    }

    
    @Override
    public List<ReserveDTO> getAllReservationsSortedByDate() {
        return reserveRepository.findAllByOrderByRsDtDesc() // 날짜순으로 정렬된 예약 조회
                .stream()
                .map(reserve -> modelMapper.map(reserve, ReserveDTO.class)) // Entity를 DTO로 변환
                .collect(Collectors.toList());
    }
    
    // 날짜로 검색
    @Override
    public List<ReserveDTO> searchUserByDate(LocalDate rsDt){
    	List<Reserve> reservation = reserveRepository.findByrsDt(rsDt);
    	return reservation.stream()
    			.map(this::convertToDTO)
    			.collect(Collectors.toList());
    }
    
    // 이름으로 검색
    @Override
    public List<ReserveDTO> searchUserByName(String rsNm)
	{
    	List<Reserve> reservation = reserveRepository.findByrsNm(rsNm);
    	return reservation.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
	}
    
    //삭제 메소드
    @Override
    @Transactional
    public void deleteReservation(Long reservationId)
    {
    	reserveRepository.deleteById(reservationId);
    }
    
    public ReserveDTO convertToDTO(Reserve reserve) {
        ReserveDTO reserveDTO = new ReserveDTO();
        reserveDTO.setRsNb(reserve.getRsNb());
        reserveDTO.setRsDt(reserve.getRsDt());
        reserveDTO.setRsTotalPersonCnt(reserve.getRsTotalPersonCnt());  // 자동 계산된 값 사용
        reserveDTO.setRsAdultPersonCnt(reserve.getRsAdultPersonCnt());
        reserveDTO.setRsChildPersonCnt(reserve.getRsChildPersonCnt());
        reserveDTO.setRsPreagePersonCnt(reserve.getRsPreagePersonCnt());
        reserveDTO.setRsVisitTotalCnt(reserve.getRsVisitTotalCnt());  // 자동 계산된 값 사용
        reserveDTO.setRsVisitAdultCnt(reserve.getRsVisitAdultCnt());
        reserveDTO.setRsVisitChildCnt(reserve.getRsVisitChildCnt());
        reserveDTO.setRsVisitPreageCnt(reserve.getRsVisitPreageCnt());
        reserveDTO.setRsNm(reserve.getRsNm());
        reserveDTO.setRsPhn(reserve.getRsPhn());
        reserveDTO.setRsSignificant(reserve.getRsSignificant());
        reserveDTO.setRsVisitYn(reserve.isRsVisitYn());
        reserveDTO.setRsPaymentCompleteYn(reserve.isRsPaymentCompleteYn());
        reserveDTO.setUrId(reserve.getUser().getUrId());  // User 객체에서 urId 가져오기
        return reserveDTO;
    }
}
