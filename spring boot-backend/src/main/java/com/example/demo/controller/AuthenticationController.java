package com.example.demo.controller;

import java.util.Collections;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.RoleName;
import com.example.demo.exception.AppException;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.RegisterRequest;
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.payload.response.JwtResponse;
import com.example.demo.security.JwtProvider;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	@Autowired
	AuthenticationManager authManager;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RoleService roleService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest login) {
		Authentication authentication = authManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				login.getEmail(),
				login.getPassword()
			)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtResponse(jwt));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest register) {
		if (userService.existsByUsername(register.getUsername()))
			return new ResponseEntity(new ApiResponse(false, "Username already exists."), HttpStatus.BAD_REQUEST);
		if (userService.existsByEmail(register.getEmail()))
			return new ResponseEntity(new ApiResponse(false, "Email already exists."), HttpStatus.BAD_REQUEST);
		User user = new User(
				register.getName(),
				register.getUsername(),
				register.getEmail(),
				passwordEncoder.encode(register.getPassword())
		);
		Role role = roleService.loadByRoleName((RoleName.ROLE_USER))
				.orElseThrow(()-> new AppException("Role user was not set"));
		user.setRoles(Collections.singleton(role));
		userService.save(user);
		// Will return a jwt token instead of message
		//return new ResponseEntity(new ApiResponse(true, "You registered successefully !!!"), HttpStatus.CREATED);
		Authentication authentication = authManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				register.getEmail(),
				register.getPassword()
			)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		return new ResponseEntity(new JwtResponse(jwt), HttpStatus.CREATED);
	}
}
