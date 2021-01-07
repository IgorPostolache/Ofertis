package com.example.demo.security;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtProvider {
	@Value("${ofertis.app.secret}")
	private String secretKey;
	
	@Value("${ofertis.app.expiration}")
	private int expiration;
	
	@Autowired
	UserService userService;
	
	public String generateToken(Authentication auth) {
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) auth.getPrincipal();
		return Jwts.builder()
				.setSubject(userDetailsImpl.getEmail())
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + expiration))
				.signWith(SignatureAlgorithm.HS512, secretKey)
				.compact();
	}
	
	public boolean validateJwt(String jwt) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt);
			return true;
		} catch (SignatureException e) {
			log.error("Failed token signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			log.error("Malformed token : {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			log.error("Expired token : {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			log.error("Unsupported token : {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("Empty token : {}", e.getMessage());
		}
		return false;
	}
	
	public String getEmailFromJwt(String jwt) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody().getSubject();
	}
	
	public String getEmailFromAuthorizationHeader(HttpServletRequest req) {
		String jwt = req.getHeader("Authorization").replace("Bearer ", "");
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody().getSubject();
	}
	
	public User getUserFromAuthorizationHeader(HttpServletRequest req) {
		String jwt = req.getHeader("Authorization").replace("Bearer ", "");
		String usernameOrEmail = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody().getSubject();
		User user = userService.loadByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
				.orElseThrow(() -> new UsernameNotFoundException("No user was found with this email."));
		return user;
	}
}
