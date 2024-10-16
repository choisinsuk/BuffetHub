package com.hub.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.hub.domain.Reserve;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;
import com.hub.dto.ReserveDTO;
import com.hub.repository.ReserveRepository;

@ExtendWith(MockitoExtension.class)
public class ReserveServiceImplTest {

    @InjectMocks
    private ReserveServiceImpl reserveService;

    @Mock
    private ReserveRepository reserveRepository;

    private String testUrId = "testUserId";

    @BeforeEach
    public void setUp() {
        // Any necessary setup can be done here
    }

    @Test
    public void testPaidReservationsList() {
        // Given
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        pageRequestDTO.setPage(1);
        pageRequestDTO.setSize(10);

        Reserve reserve1 = new Reserve();
        reserve1 = Reserve.builder().rsNb(305L).build();
       
        Reserve reserve2 = new Reserve();
        reserve2 = Reserve.builder().rsNb(303L).build();

        List<Reserve> reserves = Arrays.asList(reserve1, reserve2);
        Page<Reserve> reservePage = new PageImpl<>(reserves, PageRequest.of(0, 10), reserves.size());

        when(reserveRepository.findPaidReservationsByUrId(testUrId, any())).thenReturn(reservePage);

        // When
        PageResponseDTO<ReserveDTO> response = reserveService.paidReservationsList(pageRequestDTO);

        // Then
        assertNotNull(response);
        assertEquals(2, response.getDtoList().size());
        assertEquals(2, response.getTotalCount());
        verify(reserveRepository, times(1)).findPaidReservationsByUrId(testUrId, any());
    }
}
