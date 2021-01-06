package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class ResetPasswordRequest {
	@NotBlank
	private String email;
}
