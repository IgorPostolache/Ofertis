package com.example.demo.controller;

import java.util.Locale;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.model.VerificationToken;
import com.example.demo.payload.request.ChangePasswordRequest;
import com.example.demo.payload.request.ResetPasswordRequest;
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.service.MailService;
import com.example.demo.service.UserService;
import com.example.demo.service.VerificationTokenService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
	@Autowired
	Environment env;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private MessageSource messages;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private VerificationTokenService verificationTokenService;
	
	@PostMapping("/reset_password")
	public ResponseEntity<?> resetPassword(HttpServletRequest req, @Valid @RequestBody ResetPasswordRequest reqEmail) {
		User user = userService.loadByEmail(reqEmail.getEmail());
		if (user == null)
			return new ResponseEntity(new ApiResponse(false, "No user found for the email " + reqEmail.getEmail()), HttpStatus.BAD_REQUEST);
		String token = UUID.randomUUID().toString();
		verificationTokenService.createPasswordResetToken(token, user);
		
		try {
			String appUrl = "http://" + req.getServerName() + ":4200" + req.getContextPath();
			
			SimpleMailMessage email = mailService.resetTokenEmail(appUrl, req.getLocale(), token, user);
			
			mailService.send(email);
		} catch (MailAuthenticationException e) {
			log.error("MailAuthenticationException: {}", e);
			return new ResponseEntity(new ApiResponse(false, "MailAuthenticationException"), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			log.error("Exception: {}", e);
			return new ResponseEntity(new ApiResponse(false, "Exception"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(new ApiResponse(true, messages.getMessage("message.resetPassword", null, req.getLocale())));
	}
	
	@PostMapping("/change_password")
	public ResponseEntity<?> changePassword(Locale locale, @Valid @RequestBody ChangePasswordRequest req) {
		String result = verificationTokenService.validatePasswordResetToken(req.getToken());
		
		if (StringUtils.hasText(result)) {
			String message = messages.getMessage("message.tokenInvalid" +" " + result, null, locale);
			return new ResponseEntity(new ApiResponse(false, message), HttpStatus.BAD_REQUEST);
		}
		
		VerificationToken verTkn = verificationTokenService.loadByToken(req.getToken());
		
		User user = verTkn.getUser();
		user.setPassword(passwordEncoder.encode(req.getPassword()));
		userService.save(user);
		
		SimpleMailMessage email = mailService.confirmPasswordResetEmail(locale, user);
		mailService.send(email);
		
		verificationTokenService.delete(verTkn);
		
		return ResponseEntity.ok(new ApiResponse(true, "You have successefully changed the password."));
	}
}
