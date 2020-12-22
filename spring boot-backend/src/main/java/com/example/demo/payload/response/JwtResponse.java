package com.example.demo.payload.response;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter @RequiredArgsConstructor
public class JwtResponse {
	@NonNull private String accessToken;
	private String tokenType = "Bearer";
	@NonNull private String username;
	@NonNull private String role;	
}
