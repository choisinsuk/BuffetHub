package com.hub.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.dto.UserDTO;
import com.hub.service.KakaoService;
import com.hub.util.JWTUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {
	private final KakaoService kakaoService;

	@GetMapping("/api/user/kakao")
	public Map<String, Object> getUserFromKakao(String accessToken) {

		log.info("Received Access Token from Header: ");
		log.info(accessToken);
		
		UserDTO userDTO = kakaoService.getKakaoUser(accessToken);

		Map<String, Object> claims = userDTO.getClaims();
		
		String jwtAccessToken = JWTUtil.generateToken(claims, 10);
		String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
		
		claims.put("accessToken", jwtAccessToken);
		claims.put("refreshToken", jwtRefreshToken);
		
		return claims;
	}
}
