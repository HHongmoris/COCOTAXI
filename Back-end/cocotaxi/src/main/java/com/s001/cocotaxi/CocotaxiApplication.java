package com.s001.cocotaxi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CocotaxiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CocotaxiApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**").allowedOrigins("http://k9s101.p.ssafy.io:5000/");
			registry.addMapping("/**").allowedOrigins("http://localhost:5000/");
			}
		};
	}
}
