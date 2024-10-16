package com.hub.service;

import org.springframework.transaction.annotation.Transactional;

import com.hub.domain.User;
import com.hub.dto.UserDTO;

@Transactional
public interface KakaoService {
	UserDTO getKakaoUser(String accessToken);

	default UserDTO entityToDTO(User user) {
		UserDTO dto = new UserDTO(user.getUrId(), user.getUrPw(), user.getUrNm(), user.getUrPhn(), user.getUrEml(),
				user.getUrPrplYn(), user.getUrStmbplYn(), user.getUrAuthCode(), user.getUrJoinDt(),
				user.getUrConditionCode());
		return dto;
	}

}
