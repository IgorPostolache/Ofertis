package com.example.demo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.BadRequestException;
import com.example.demo.model.Job;
import com.example.demo.model.Subscription;
import com.example.demo.model.User;
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.repository.SubscriptionRepository;
import com.example.demo.security.JwtProvider;
import com.example.demo.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
	@Autowired
	JobService jobService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	SubscriptionRepository serviceRepository;
	
	@GetMapping
	public List<Job> getAllJobs() {
		return jobService.loadAll();
	}
	
	@GetMapping("{id}")
	public Job getJob(@PathVariable Long id) {
		return jobService.loadById(id).orElseThrow(
				() -> new BadRequestException("No job found by id " + id));
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> getAllUserJobs(@PathVariable Long id) {
		List<Job> jobs = jobService.loadByUserId(id);
		return ResponseEntity.ok(jobs);
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getAllUserJobs(HttpServletRequest req) {
		long id = jwtProvider.getUserFromAuthorizationHeader(req).getId();
		List<Job> jobs = jobService.loadByUserId(id);
		return ResponseEntity.ok(jobs);
	}
	
	@PostMapping
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> addJob(@Valid @RequestBody Job job, HttpServletRequest req) {
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		Subscription service = serviceRepository.findByIdOrUserId(user.getId(), user.getId())
				.orElseThrow(() -> new BadRequestException("No active subscription was found for the current user. Please chose a subscription and subscribe again."));
		job.setUser(user);
		jobService.save(job);
		return new ResponseEntity(job, HttpStatus.CREATED);
	}
	
	@PutMapping
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> updateJob(@Valid @RequestBody Job jobReq, HttpServletRequest req) {
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		Subscription service = serviceRepository.findByIdOrUserId(user.getId(), user.getId())
				.orElseThrow(() -> new BadRequestException("No active subscription was found for the current user. Please chose a subscription and subscribe again."));
		
		if (jobReq.getId() == null) return new ResponseEntity(new BadRequestException("Job id must be provided"), HttpStatus.BAD_REQUEST);
		Job job = jobService.loadById(jobReq.getId()).orElseThrow(
				() -> new BadRequestException("No job found by id " + jobReq.getId()));
		
		job.setName(jobReq.getName());
		jobService.save(job);
		return ResponseEntity.ok(job);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> deleteJob(@PathVariable Long id, HttpServletRequest req) {
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		Subscription service = serviceRepository.findByIdOrUserId(user.getId(), user.getId())
				.orElseThrow(() -> new BadRequestException("No active subscription was found for the current user. Please chose a subscription and subscribe again."));
		
		Job job = jobService.loadById(id).orElseThrow(
				() -> new BadRequestException("No job found by id " + id));
		jobService.delete(job);
		return ResponseEntity.ok(new ApiResponse(true, "Job was deleted."));
	}
}
