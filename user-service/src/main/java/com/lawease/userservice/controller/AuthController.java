package com.lawease.userservice.controller;

import com.lawease.userservice.dto.request.LoginRequest;
import com.lawease.userservice.dto.request.SignupRequest;
import com.lawease.userservice.dto.response.JwtResponse;
import com.lawease.userservice.payload.response.ApiResponse;
import com.lawease.userservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<JwtResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("User authenticated successfully", jwtResponse));
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResponse<Void>> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        authService.registerUser(signUpRequest);
        return new ResponseEntity<>(ApiResponse.success("User registered successfully"), HttpStatus.CREATED);
    }
}
