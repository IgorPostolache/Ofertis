package com.example.demo.payload.response;

public class JwtResponse {
	private String accessToken;
	private String tokenType = "Bearer";
	private String username;
	private String role;

	public JwtResponse(String accessToken, String username, String role) {
		this.accessToken = accessToken;
		this.username = username;
		this.role = role;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
}
