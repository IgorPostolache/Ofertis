package com.example.demo.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class CreateSubscriptionRequest {
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	private String token;
	
	@NotBlank
	private String plan;
	
	private String cupon;
}
