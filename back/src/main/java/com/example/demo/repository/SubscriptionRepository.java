package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
	Optional<Subscription> findByIdOrUserId(Long id, Long userId);
	Optional<Subscription> findBysubscriptionId(String id);
	List<Subscription> findByuserId(Long id);
	List<Subscription> findByuserIdOrderByStartsDesc(Long id);
}
