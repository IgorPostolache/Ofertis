package com.example.demo.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class StripeResponse {
	private String customer_id;
	private String subscription_id;
	private String subscription_name;
}
