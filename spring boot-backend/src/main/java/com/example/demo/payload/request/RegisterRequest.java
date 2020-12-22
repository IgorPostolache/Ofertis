package com.example.demo.payload.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegisterRequest {
	@NotBlank
	@Size(min = 4, max = 40)
	private String name;
	
	@NotBlank
	@Size(min = 3, max = 15)
	private String username;
	
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;
	
	@NotBlank
	@Size(min = 6, max = 20)
	private String password;
	
	private Set<String> role;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
	
	
}
