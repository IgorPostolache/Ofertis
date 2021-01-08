package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.BadRequestException;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/test")
public class TestController {
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/hi")
	public String hi() {
		System.err.println(passwordEncoder.encode("aaaaaa"));
		return "Use this method to change psw in data base.";
	}
	@GetMapping("/error")
	public String error() {
		throw new BadRequestException("You did it wrong!");
	}
}
