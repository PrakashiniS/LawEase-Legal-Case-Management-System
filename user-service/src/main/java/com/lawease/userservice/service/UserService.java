package com.lawease.userservice.service;

import com.lawease.userservice.dto.response.UserInfoResponse;
import com.lawease.userservice.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    
    User getUserById(Long id);
    
    User updateUser(Long id, User userDetails);
    
    void deleteUser(Long id);
    
    UserInfoResponse getUserInfo(String username);
    
    String getCurrentUserUsername();
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    User saveUser(User user);
}
