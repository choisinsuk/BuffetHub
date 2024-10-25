package com.hub.dto;

import java.time.LocalDateTime;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreeBoardDTO {
    private Long ftNb;      // 공지번호
    private String ftTitle; // 제목
    private String ftCtt;   // 내용
    private LocalDateTime ftRegdt; // 등록일자

}
