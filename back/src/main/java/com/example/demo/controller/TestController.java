package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@GetMapping("/hi")
	public String hi() {
		System.err.println(passwordEncoder.encode("aaaaaa"));
		return "Use this method to change psw in data base.";
	}
}
