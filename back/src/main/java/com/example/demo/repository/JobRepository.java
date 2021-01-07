package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
	@Query("SELECT j from Job j WHERE user_id = :id")
	List<Job> findByuserId(@Param("id") Long id);
}
