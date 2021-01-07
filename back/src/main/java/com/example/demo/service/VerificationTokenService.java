package com.example.demo.service;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.User;
import com.example.demo.model.VerificationToken;
import com.example.demo.repository.VerificationTokenRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class VerificationTokenService {
	@Autowired
	VerificationTokenRepository verificationTokenRepository;
	
	public VerificationToken loadByToken(String token) {
		return verificationTokenRepository.findByToken(token);
	}
	
	public void createPasswordResetToken(String token, User user) {
		VerificationToken verToken = new VerificationToken(token, user);
		verificationTokenRepository.save(verToken);
	}
	
	public String validatePasswordResetToken(String token) {
		VerificationToken verToken = verificationTokenRepository.findByToken(token);
		log.info("El token es: {}", verToken);
		return !isTokenFound(verToken) ? "invalidToken"
				: isTokenExpired(verToken) ? "expired"
				: null;
	}
	
	public boolean isTokenFound(VerificationToken verToken) {
		return verToken != null;
	}
	
	public boolean isTokenExpired(VerificationToken verToken) {
		Calendar cal = Calendar.getInstance();
		return verToken.getExpiryDate().before(cal.getTime());
	}
	
	public void delete(VerificationToken verTkn) {
		verificationTokenRepository.delete(verTkn);
	}
}
