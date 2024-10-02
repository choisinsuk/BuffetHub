package com.hub.util;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.InvalidClaimException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTUtil {

	private static String key = "1234567890123456789012345678901234567890";

	public static String generateToken(Map<String, Object> valueMap, int min) {
		SecretKey key = null;

		try {
			key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		// https://javadoc.io/doc/io.jsonwebtoken/jjwt-api/latest/io/jsonwebtoken/JwtBuilder.html#claims()
		String jwtStr = Jwts.builder().header().add(Map.of("typ", "JWT")).and().claims(valueMap)
				.issuedAt(Date.from(ZonedDateTime.now().toInstant()))
				.expiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant())).signWith(key).compact();
		return jwtStr;
	}

	public static Map<String, Object> validateToken(String token) {
		Map<String, Object> claim = null;
		try {
			SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
			
			// 파싱 및 검증, 실패 시 에러
			claim = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
		} catch (MalformedJwtException malformedJwtException) {
			throw new CustomJWTException("MalFormed");
		} catch (ExpiredJwtException expiredJwtException) {
			throw new CustomJWTException("Expired");
		} catch (InvalidClaimException invalidClaimException) {
			throw new CustomJWTException("Invalid");
		} catch (JwtException jwtException) {
			throw new CustomJWTException("JWTError");
		} catch (Exception e) {
			throw new CustomJWTException("Error");
		}
		return claim;
	}
}