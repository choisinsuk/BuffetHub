package com.hub.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hub.security.filter.JWTCheckFilter;
import com.hub.security.handler.APILoginFailHandler;
import com.hub.security.handler.APILoginSuccessHandler;
import com.hub.security.handler.CustomAccessDeniedHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Configuration
@EnableWebSecurity // 없으니 HttpSecurity 타입의 빈(bean)을 찾지 못해 발생하는 문제가 발생하여 추가함
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		log.info("-----------------securityConfig-----------------");

		http.cors(httpSecurityCorsConfigurer -> {
			httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
		});

		http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.csrf(config -> config.disable());
		
		http.formLogin(config -> {
			config.loginPage("/api/user/login");
			config.successHandler(new APILoginSuccessHandler());  // 로그인 후 처리는 APILoginSuccessHandler
			config.failureHandler(new APILoginFailHandler()); // 로그인 실패 후 처리 APILoginFailHandler
		});
		
		http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class); // JWT 체크
		
		http.exceptionHandling(config -> {
			config.accessDeniedHandler(new CustomAccessDeniedHandler());
		});
		
//	    // 회원가입 엔드포인트 및 기타 요청 권한 설정
//	    http.authorizeHttpRequests(authorizeRequests -> {
//	        authorizeRequests
//	            .requestMatchers("/api/user/register").permitAll() // 인증 없이 회원가입 엔드포인트 접근 허용
//	            .anyRequest().authenticated(); // 그 외의 모든 요청은 인증 필요
//	    });
		
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
