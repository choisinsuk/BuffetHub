package com.hub.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.hub.domain.User;
import com.hub.domain.UserRole;
import com.hub.dto.UserDTO;
import com.hub.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class KakaoServiceImpl implements KakaoService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserDTO getKakaoUser(String accessToken) {
		String email = getEmailFromKakaoAccessToken(accessToken);
		log.info("email: " + email);
		Optional<User> result = userRepository.findByUrEml(email);

		// 기존의 회원
		if (result.isPresent()) {
			UserDTO userDTO = entityToDTO(result.get());
			return userDTO;
		}

		// 회원이 아니었다면 아이디는
		User socialUser = makeSocialUser(email);
		userRepository.save(socialUser);
		UserDTO userDTO = entityToDTO(socialUser);
		return userDTO;
	}

	private User makeSocialUser(String email) {
		String tempPassword = makeTempPassword();
		log.info("tempPassword:" + tempPassword);
		String name = "소셜회원";

		Date joinDate = new Date(); // 현재 날짜와 시간
		
	    // 이메일에서 '@' 앞 부분 추출
	    String urId = email.substring(0, email.indexOf('@'));

		User user = User.builder().urId(urId).urPw(passwordEncoder.encode(tempPassword)).urNm(name)
				.urPhn("01000000000").urEml(email).urPrplYn("Y").urStmbplYn("Y").urAuthCode(UserRole.USER)
				.urJoinDt(joinDate).urConditionCode("ACTIVE").build();
		
		return user;
	}
	
	private String makeTempPassword() {
	    // 대문자와 숫자를 포함할 수 있는 문자 집합
	    String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    String numbers = "0123456789";
	    String combinedChars = upperCaseLetters + numbers;

	    // SecureRandom을 사용하여 더 안전한 임시 비밀번호 생성
	    SecureRandom random = new SecureRandom();
	    StringBuilder tempPassword = new StringBuilder(6);

	    // 6자리 임시 비밀번호 생성
	    for (int i = 0; i < 6; i++) {
	        int index = random.nextInt(combinedChars.length());
	        tempPassword.append(combinedChars.charAt(index));
	    }

	    return tempPassword.toString();
	}

	private String getEmailFromKakaoAccessToken(String accessToken) {
		String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

		if (accessToken == null) {
			throw new RuntimeException("Access Token is null");
		}
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-Type", "application/x-www-form-urlencoded");
		HttpEntity<String> entity = new HttpEntity<>(headers);

		UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

		ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity,
				LinkedHashMap.class);
		log.info(response);

		LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
		log.info("--------------------");
		log.info(bodyMap);

		LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");
		log.info("kakaoAccount: " + kakaoAccount);

		return kakaoAccount.get("email");

	}

}
