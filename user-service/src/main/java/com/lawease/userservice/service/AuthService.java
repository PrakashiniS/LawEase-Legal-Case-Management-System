package com.lawease.userservice.service;

import com.lawease.userservice.dto.request.LoginRequest;
import com.lawease.userservice.dto.request.SignupRequest;
import com.lawease.userservice.dto.response.JwtResponse;

import jakarta.validation.Valid;

public interface AuthService {
    JwtResponse authenticateUser(LoginRequest loginRequest);
    void registerUser(SignupRequest signUpRequest);
}
