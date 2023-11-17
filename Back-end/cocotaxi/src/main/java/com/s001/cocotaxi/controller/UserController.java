package com.s001.cocotaxi.controller;

import com.s001.cocotaxi.jwt.domain.User;
import com.s001.cocotaxi.jwt.dto.LoginRequest;
import com.s001.cocotaxi.jwt.service.UserService;
import com.s001.cocotaxi.jwt.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String message = null;

        User user = userService.login(loginRequest);

        if(user == null) {
            log.info("로그인 실패");
            message = "로그인 아이디 또는 비밀번호가 틀렸습니다.";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        }else {
            message = "로그인 성공";
            log.info("로그인 성공");
            return ResponseEntity.status(HttpStatus.OK).body(message);
        }
    }
}
