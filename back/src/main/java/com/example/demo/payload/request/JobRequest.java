package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class JobRequest {
	@NotBlank
	private String query;
}
