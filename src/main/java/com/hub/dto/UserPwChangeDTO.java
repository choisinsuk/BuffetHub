package com.hub.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserPwChangeDTO {
    private String currentPassword; // 현재 비밀번호
    private String newPassword;      // 새 비밀번호
    private String confirmPassword;  // 새 비밀번호 확인

}
