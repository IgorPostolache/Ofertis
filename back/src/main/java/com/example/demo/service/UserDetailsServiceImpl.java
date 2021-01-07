package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.User;
import com.example.demo.security.UserDetailsImpl;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	@Autowired
	UserService userService;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		User user = userService.loadByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
				.orElseThrow(()->
						new UsernameNotFoundException("No user found by username or email " + usernameOrEmail));
		return UserDetailsImpl.build(user);
	}

}
