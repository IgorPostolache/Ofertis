package com.example.demo.exception;

import java.util.Date;

import lombok.Getter;
@Getter
public class ErrorDetails {
	private String details;
	private String message;
	private Date timestamp;
	
	public ErrorDetails(String details, String message, Date timestamp) {
        super();
        this.details = details;
        this.message = message;
        this.timestamp = timestamp;
    }
}
