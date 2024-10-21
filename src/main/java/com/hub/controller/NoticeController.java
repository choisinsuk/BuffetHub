package com.hub.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper; // 추가된 부분
import org.springframework.web.bind.annotation.*;

import com.hub.domain.NoticeBoard;
import com.hub.dto.NoticeBoardDTO;
import com.hub.service.NoticeBoardService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/noticeBoard")
public class NoticeController {
    
    private final NoticeBoardService noticeService;
    private final ModelMapper modelMapper; // 추가된 부분

    @GetMapping("/list")
    public List<NoticeBoardDTO> getNoticeList() {
        List<NoticeBoard> notices = noticeService.getAllNoticeBoard(); // 수정된 부분
        return notices.stream()
                .map(notice -> modelMapper.map(notice, NoticeBoardDTO.class)) // 수정된 부분
                .collect(Collectors.toList()); // 수정된 부분
    }
}
