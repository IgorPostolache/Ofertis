package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.payload.response.ApiResponse;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
	
	@GetMapping("/all")
	public ResponseEntity<?> all() {
		return ResponseEntity.ok(new ApiResponse(true, "Generall content."));
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> userProfile() {
		return ResponseEntity.ok(new ApiResponse(true, "User profile."));
	}
	
	@GetMapping("/user_vip")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> userVipProfile() {
		return ResponseEntity.ok(new ApiResponse(true, "User vip profile."));
	}
	
	@GetMapping("/user_admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> userAdminProfile() {
		return ResponseEntity.ok(new ApiResponse(true, "User admin profile."));
	}
	
	@GetMapping("/user_moderator")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> userModeratorProfile() {
		return ResponseEntity.ok(new ApiResponse(true, "User moderator profile."));
	}
}
