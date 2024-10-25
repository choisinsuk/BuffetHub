package com.hub.dto;

import java.time.LocalDateTime;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDTO {
    private Long ntNb;      // 공지번호
    private String ntTitle; // 제목
    private String ntCtt;   // 내용
    private LocalDateTime ntRegdt; // 등록일자


}
