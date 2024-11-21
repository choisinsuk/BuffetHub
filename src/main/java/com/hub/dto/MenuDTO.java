package com.hub.dto;

import lombok.*;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuDTO {
    private Long menuId;            // 메뉴 ID
    private String menuName;        // 메뉴 이름
    private String menuCategory;    // 메뉴 카테고리
}
