package com.hub.service;

import com.hub.domain.CustomerInquiryBoard;
import com.hub.dto.CustomerInquiryBoardDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.repository.CustomerInquiryBoardRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerInquiryBoardServiceImpl implements CustomerInquiryBoardService {

    private final CustomerInquiryBoardRepository repository;
    private final ModelMapper modelMapper;

    @Override
    public List<CustomerInquiryBoardDTO> getAllInquiries(String role) {
        if (!role.equals("ADMIN")) {
            throw new AccessDeniedException("접근이 허용되지 않습니다.");
        }
        return repository.findAll().stream()
                .map(inquiry -> modelMapper.map(inquiry, CustomerInquiryBoardDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CustomerInquiryBoardDTO get(Long cqNb, String role, String usId) {
        CustomerInquiryBoard inquiry = repository.findById(cqNb)
                .orElseThrow(() -> new IllegalArgumentException("문의 번호를 찾을 수 없습니다."));
        if (!role.equals("ADMIN") && !inquiry.getUsId().equals(usId)) {
            throw new AccessDeniedException("접근이 허용되지 않습니다.");
        }
        return modelMapper.map(inquiry, CustomerInquiryBoardDTO.class);
    }

    @Override
    public CustomerInquiryBoardDTO createInquiry(CustomerInquiryBoardDTO inquiryDTO, String role) {
        CustomerInquiryBoard inquiry = modelMapper.map(inquiryDTO, CustomerInquiryBoard.class);
        inquiry.setCqRegdt(LocalDateTime.now());
        return modelMapper.map(repository.save(inquiry), CustomerInquiryBoardDTO.class);
    }

    @Override
    public void modify(CustomerInquiryBoardDTO inquiryDTO, String role, String usId) {
        CustomerInquiryBoard inquiry = repository.findById(inquiryDTO.getCqNb())
                .orElseThrow(() -> new IllegalArgumentException("문의가 존재하지 않습니다."));
        if (!role.equals("ADMIN") && !inquiry.getUsId().equals(usId)) {
            throw new AccessDeniedException("접근이 허용되지 않습니다.");
        }
        inquiry.setCqTitle(inquiryDTO.getCqTitle());
        inquiry.setCqCtt(inquiryDTO.getCqCtt());
        inquiry.setCqAnswerCtt(inquiryDTO.getCqAnswerCtt());
        inquiry.setCqAnswerRegdt(LocalDateTime.now());
        repository.save(inquiry);
    }

    @Override
    public void remove(Long cqNb, String role, String usId) {
        CustomerInquiryBoard inquiry = repository.findById(cqNb)
                .orElseThrow(() -> new IllegalArgumentException("문의가 존재하지 않습니다."));
        if (!role.equals("ADMIN") && !inquiry.getUsId().equals(usId)) {
            throw new AccessDeniedException("접근이 허용되지 않습니다.");
        }
        repository.deleteById(cqNb);
    }

    @Override
    public PageResponseDTO<CustomerInquiryBoardDTO> list(PageRequestDTO pageRequestDTO, String role) {
        if (!role.equals("ADMIN")) {
            throw new AccessDeniedException("접근이 허용되지 않습니다.");
        }
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
                Sort.by("cqNb").descending());
        Page<CustomerInquiryBoard> result = repository.findAll(pageable);
        List<CustomerInquiryBoardDTO> dtoList = result.getContent().stream()
                .map(inquiry -> modelMapper.map(inquiry, CustomerInquiryBoardDTO.class))
                .collect(Collectors.toList());
        long totalCount = result.getTotalElements();
        return PageResponseDTO.<CustomerInquiryBoardDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public boolean existsById(Long cqNb) {
        return repository.existsById(cqNb);
    }
}
