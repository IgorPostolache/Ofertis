package com.example.demo.service;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;

@Service
public class MailService {
	@Autowired
	Environment env;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private MessageSource messages;
	
	public SimpleMailMessage confirmPasswordResetEmail(final Locale locale, final User user) {
		SimpleMailMessage email = new SimpleMailMessage();
        
		email.setTo(user.getEmail());
        email.setSubject("Password Changed");
        
        String message = messages.getMessage("message.updatePasswordSuc", null, locale);
        email.setText(message);
        
        email.setFrom(env.getProperty("support.email"));
        
        return email;
    }
	
	public SimpleMailMessage resetTokenEmail(String contextPath, Locale locale, String token, User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        
        email.setTo(user.getEmail());
        email.setSubject("Reset Password");
        
        String url = contextPath + "/reset_password?token=" + token;
        String message = messages.getMessage("message.resetPasswordEmail", null, locale);
        email.setText(message + " \r\n" + url);
        
        email.setFrom(env.getProperty("support.email"));
        
        return email;
    }
	
	public void send(SimpleMailMessage email) {
		mailSender.send(email);
	}
}
