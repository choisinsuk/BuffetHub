package com.hub.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserChkPwDTO {
    private String urId;              // 사용자 ID
    private String currentPassword;    // 현재 비밀번호
}
