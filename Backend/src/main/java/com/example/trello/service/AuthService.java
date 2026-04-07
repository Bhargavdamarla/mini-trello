package com.example.trello.service;

import com.example.trello.dto.AuthRequest;
import com.example.trello.dto.AuthResponse;
import com.example.trello.exception.EmailAlreadyExistsException;
import com.example.trello.exception.InvalidCredentialsException;
import com.example.trello.model.User;
import com.example.trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse signup(AuthRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered. Please login instead.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, hash this!
        user.setName(request.getName());
        
        String token = UUID.randomUUID().toString();
        user.setToken(token);  // Store token
        
        user = userRepository.save(user);
        
        return new AuthResponse(token, user.getEmail(), user.getName(), user.getId());
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            throw new InvalidCredentialsException("No account found with this email. Please sign up.");
        }
        
        User foundUser = user.get();
        if (!foundUser.getPassword().equals(request.getPassword())) {
            throw new InvalidCredentialsException("Incorrect password. Please try again.");
        }
        
        String token = UUID.randomUUID().toString();
        foundUser.setToken(token);  // Store new token
        userRepository.save(foundUser);
        
        return new AuthResponse(token, foundUser.getEmail(), foundUser.getName(), foundUser.getId());
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
