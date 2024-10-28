package com.hub.service;

import com.hub.dto.FreeBoardDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;

import java.util.List;

public interface FreeBoardService {
	
    List<FreeBoardDTO> getAllFreeBoards();
    
    FreeBoardDTO createFreeBoard(FreeBoardDTO freeBoardDTO);
    
    void modify(FreeBoardDTO freeBoardDTO);
    
    void remove(Long FtNb);
    
    PageResponseDTO<FreeBoardDTO> list(PageRequestDTO pageRequestDTO);
    
    FreeBoardDTO get(Long ftNb);
	
}
