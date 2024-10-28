package com.hub.service;

import com.hub.dto.CustomerInquiryBoardDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;

import java.util.List;

public interface CustomerInquiryBoardService {

    List<CustomerInquiryBoardDTO> getAllInquiries(String role);

    CustomerInquiryBoardDTO get(Long cqNb, String role, String usId);

    CustomerInquiryBoardDTO createInquiry(CustomerInquiryBoardDTO inquiryDTO, String role);

    void modify(CustomerInquiryBoardDTO inquiryDTO, String role, String usId);

    void remove(Long cqNb, String role, String usId);

    PageResponseDTO<CustomerInquiryBoardDTO> list(PageRequestDTO pageRequestDTO, String role);

    boolean existsById(Long cqNb);
}
