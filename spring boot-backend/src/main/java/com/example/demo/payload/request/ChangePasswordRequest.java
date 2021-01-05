package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class ChangePasswordRequest {
	@NotBlank
	private String token;
	
	@NotBlank
	private String password;
}
