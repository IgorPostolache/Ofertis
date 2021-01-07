package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Service;
import com.example.demo.model.User;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
	Optional<Service> findByIdOrUserId(Long id, Long userId);
	Optional<Service> findBysubscriptionId(String id);
}
