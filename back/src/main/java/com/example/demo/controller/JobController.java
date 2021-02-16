package com.example.demo.controller;

import java.util.Date;
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
import com.example.demo.payload.request.JobRequest;
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
	public Job getJob(@PathVariable String id) {
		return jobService.loadById(id).orElseThrow(
				() -> new BadRequestException("No job found by id " + id));
	}
	// FIX AT LATER POINT WHEN IMPLEMENTING USER_VIP PROFILE
	/*
	@GetMapping("/user/{user_id}")
	public List<Job> getAllUserJobs(@PathVariable String user_id) {
		return jobService.loadAllByUserId(user_id);
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getAllUserJobs(HttpServletRequest req) {
		Long user_id = jwtProvider.getUserFromAuthorizationHeader(req).getId();
		List<Job> jobs = jobService.loadAllByUserId(Long.toString(user_id));
		return ResponseEntity.ok(jobs);
	}
	*/
	
	@PostMapping
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> addJob(@Valid @RequestBody Job job, HttpServletRequest req) {
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		Subscription service = serviceRepository.findByIdOrUserId(user.getId(), user.getId())
				.orElseThrow(() -> new BadRequestException("You need to have an active subscription in order to post a job."));
		
		job.setCreated_at(new Date());
		job.setUpdated_at(new Date());
		job.setUser_id(Long.toString(user.getId()));
		jobService.add(job);
		
		return new ResponseEntity(job, HttpStatus.CREATED);
	}
	
	@PutMapping
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> updateJob(@Valid @RequestBody Job jobReq, HttpServletRequest req) {
		
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		Subscription service = serviceRepository.findByIdOrUserId(user.getId(), user.getId())
				.orElseThrow(() -> new BadRequestException("You need to have an active subscription in order to update a job."));
			
		jobService.update(jobReq);
		return ResponseEntity.ok(jobReq);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> deleteJob(@PathVariable String id, HttpServletRequest req) {
		
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		Subscription service = serviceRepository.findByIdOrUserId(user.getId(), user.getId())
				.orElseThrow(() -> new BadRequestException("You need to have an active subscription in order to delete a job."));
		
		jobService.delete(id);
		return ResponseEntity.ok(new ApiResponse(true, "Job was deleted."));
	}
	
	@PostMapping("/search")
	public List<Job> searchFuzzyJob(@Valid @RequestBody JobRequest jobReq) {
		return jobService.fuzzySearch(jobReq.getQuery());
	}
}
