package com.example.demo.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
	// SO FAR I ONLY WANT TO RETURN 1 ROLE, 
	// MAYBE IN FUTURE I WILL RETURN AN ARRAY WITH ALL ROLES...
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

		String role = authentication.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList()).toString();
		// CLEANING "[" and "]" from String.
		role = role.substring(1);
		role = role.substring(0,role.length() - 1 );
		return ResponseEntity.ok(new JwtResponse(jwt, authentication.getName(), role, login.getEmail()));
	}
	// THE USER CAN OPTIONALLY REGISTER WITH MULTIPLE ROLES 
	// BUT SO FAR I ONLY ALLOW TO REGISTER WITH ROLE_USER, 
	// MAYBE IN FUTURE I WILL RETURN AN ARRAY WITH ALL ROLES...
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
		Set<String> list_roles = register.getRole();
		Set<Role> roles = new HashSet<>();
		if (list_roles == null) {
			Role user_role = roleService.loadByRoleName(RoleName.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(user_role);
		} else {
			list_roles.forEach(role -> {
				switch (role) {
				case "user_vip":
					Role user_vip_role = roleService.loadByRoleName(RoleName.ROLE_USER_VIP)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(user_vip_role);

					break;
				case "admin":
					Role admin_role = roleService.loadByRoleName(RoleName.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(admin_role);

					break;
				case "mod":
					Role mod_role = roleService.loadByRoleName(RoleName.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(mod_role);

					break;
				default:
					Role user_role = roleService.loadByRoleName(RoleName.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(user_role);
				}
			});
		}
		
		user.setRoles(roles);
		
		userService.save(user);
		
		Authentication authentication = authManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				register.getEmail(),
				register.getPassword()
			)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		List<String> user_roles = authentication.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		// REMOVE THE NEXT TWO LINES BELLOW IF WANT TO SHOW AN ARRAY WITH USER ROLES INSTEAD OF A STRING...
		StringBuilder strBul = new StringBuilder();
		for(String str: user_roles) {if(str == "ROLE_USER")strBul.append("ROLE_USER");}
		return new ResponseEntity(new JwtResponse(jwt, authentication.getName(), strBul.toString(), register.getEmail()), HttpStatus.CREATED);
	}
}
