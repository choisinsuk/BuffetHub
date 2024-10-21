package com.hub.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserModifyDTO {

	private String urPhn; // 전화번호
	private String urEml; // 이메일

	@Builder
	public UserModifyDTO(String urPhn, String urEml) {
		this.urPhn = urPhn;
		this.urEml = urEml;

	}
}
