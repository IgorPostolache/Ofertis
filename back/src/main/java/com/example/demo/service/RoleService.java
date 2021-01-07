package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.enums.RoleName;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;

@Service
@Transactional
public class RoleService {
	@Autowired
	RoleRepository roleRepository;
	
	public Optional<Role> loadByRoleName(RoleName roleName) {
		return roleRepository.findByName(roleName);
	}
	
	public void save(Role role) {
		roleRepository.save(role);
	}
}
