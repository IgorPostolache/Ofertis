package com.example.demo.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> globalExceptionHandler(Exception ex, WebRequest req) {
		ErrorDetails errorDetails = new ErrorDetails(req.getDescription(false), ex.getMessage(),new Date());
		return new ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<?> badRequestException(BadRequestException ex, WebRequest req) {
		ErrorDetails errorDetails = new ErrorDetails(req.getDescription(false), ex.getMessage(),new Date());
		return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundException(ResourceNotFoundException ex, WebRequest req) {
		ErrorDetails errorDetails = new ErrorDetails(req.getDescription(false), ex.getMessage(),new Date());
		return new ResponseEntity(errorDetails, HttpStatus.NOT_FOUND);
	}
}
