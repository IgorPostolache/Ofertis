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
import com.example.demo.model.User;
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.security.JwtProvider;
import com.example.demo.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
	@Autowired
	JobService jobService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	
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
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> getAllUserJobs(@PathVariable Long id) {
		List<Job> jobs = jobService.loadByUserId(id);
		return ResponseEntity.ok(jobs);
	}
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> addJob(@Valid @RequestBody Job job, HttpServletRequest req) {
		User user = jwtProvider.getUserFromAuthorizationHeader(req);
		job.setUser(user);
		jobService.save(job);
		return new ResponseEntity(new ApiResponse(true, "Job was created."), HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> updateJob(@PathVariable Long id, @Valid @RequestBody Job jobReq) {
		Job job = jobService.loadById(id).orElseThrow(
				() -> new BadRequestException("No job found by id " + id));
		job.setName(jobReq.getName());
		jobService.save(job);
		return ResponseEntity.ok("Job was updated.");
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> deleteJob(@PathVariable Long id) {
		Job job = jobService.loadById(id).orElseThrow(
				() -> new BadRequestException("No job found by id " + id));
		jobService.delete(job);
		return ResponseEntity.ok("Job was deleted.");
	}
	
}
