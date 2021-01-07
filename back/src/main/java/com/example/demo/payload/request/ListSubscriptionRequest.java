package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class ListSubscriptionRequest {
	@NotBlank
	private String customer_id;
}
