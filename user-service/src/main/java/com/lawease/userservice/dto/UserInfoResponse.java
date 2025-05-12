package com.lawease.userservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private List<String> roles;

    public UserInfoResponse(Long id, String username, String email, String firstName, 
                           String lastName, String phoneNumber, String address, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.roles = roles;
    }
}
