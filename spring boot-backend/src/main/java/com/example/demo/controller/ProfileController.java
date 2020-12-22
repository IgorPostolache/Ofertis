package com.example.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
	
	@GetMapping("/all")
	public String all() {
		return "Generall content.";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public String userProfile() {
		return "User profile.";
	}
	
	@GetMapping("/user_vip")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public String userVipProfile() {
		return "User vip profile.";
	}
	
	@GetMapping("/user_admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String userAdminProfile() {
		return "User admin profile.";
	}
	
	@GetMapping("/user_moderator")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userModeratorProfile() {
		return "User moderator profile.";
	}
}
