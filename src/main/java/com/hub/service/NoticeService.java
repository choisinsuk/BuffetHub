package com.hub.service;

import com.hub.dto.NoticeDTO;
import com.hub.dto.PageRequestDTO;
import com.hub.dto.PageResponseDTO;

import java.util.List;

public interface NoticeService {
    List<NoticeDTO> getAllNotices();
    NoticeDTO createNotice(NoticeDTO noticeDTO);
    void modify(NoticeDTO noticeDTO);
    void remove(Long NtNb);
    PageResponseDTO<NoticeDTO> list(PageRequestDTO pageRequestDTO);
    NoticeDTO get(Long ntNb); 
}
