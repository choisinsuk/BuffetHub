package com.hub.controller;

import com.hub.dto.NoticeDTO;
import com.hub.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/noticeBoard")
@CrossOrigin(origins = "http://localhost:3000")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/{ntNb}")
    public ResponseEntity<NoticeDTO> get(@PathVariable(name = "ntNb") Long ntNb) {
        NoticeDTO notice = noticeService.get(ntNb);
        if (notice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(notice);
    }

    @GetMapping("/list")
    public ResponseEntity<List<NoticeDTO>> getNoticeList() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @PostMapping("/")
    public ResponseEntity<NoticeDTO> createNotice(@RequestBody NoticeDTO noticeDto) {
        NoticeDTO createdNotice = noticeService.createNotice(noticeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNotice);
    }

    @PutMapping("/{ntNb}")
    public ResponseEntity<String> modifyNotice(@PathVariable Long ntNb, @RequestBody NoticeDTO noticeDTO) {
        noticeDTO.setNtNb(ntNb); // ntNb를 noticeDTO에 설정
        noticeService.modify(noticeDTO);
        return ResponseEntity.ok("게시글이 수정되었습니다.");
    }

    @DeleteMapping("/{ntNb}")
    public ResponseEntity<String> deleteNotice(@PathVariable("ntNb") Long ntNb) {
        try {
            noticeService.remove(ntNb);
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
