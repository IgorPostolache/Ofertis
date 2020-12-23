package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class CreateService {
	@NotBlank
	private String customerId;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String subscription_id;
}