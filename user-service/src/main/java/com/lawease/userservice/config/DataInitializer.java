package com.lawease.userservice.config;

import com.lawease.userservice.model.ERole;
import com.lawease.userservice.model.Role;
import com.lawease.userservice.model.User;
import com.lawease.userservice.repository.RoleRepository;
import com.lawease.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        if (roleRepository.count() == 0) {
            Role userRole = new Role(ERole.ROLE_USER);
            Role lawyerRole = new Role(ERole.ROLE_LAWYER);
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            
            roleRepository.save(userRole);
            roleRepository.save(lawyerRole);
            roleRepository.save(adminRole);

            // Create admin user if it doesn't exist
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setUsername("admin");
                admin.setEmail("admin@lawease.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                
                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);
                roles.add(lawyerRole);
                roles.add(userRole);
                
                admin.setRoles(roles);
                userRepository.save(admin);
            }
        }
    }
}
