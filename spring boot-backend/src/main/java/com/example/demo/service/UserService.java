package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public Optional<User> loadByUsernameOrEmail(String username, String email) {
		return userRepository.findByUsernameOrEmail(username, email);
	}
	
	public Boolean existsByUsername(String username) {
		return userRepository.existsByUsername(username);
	}
	
	public Boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	public void save(User user) {
		userRepository.save(user);
	}
}
