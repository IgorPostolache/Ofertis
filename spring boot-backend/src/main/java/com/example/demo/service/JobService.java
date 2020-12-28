package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;

@Service
@Transactional
public class JobService {
	@Autowired
	JobRepository jobRepository;
	
	public List<Job> loadAll(){
		return jobRepository.findAll();
	}
	
	public Optional<Job> loadById(Long id){
		return jobRepository.findById(id);
	}
	
	public List<Job> loadByUserId(Long id){
		return jobRepository.findByuserId(id);
	}
	 
	public void save(Job job) {
		jobRepository.save(job);
	}
	
	public void delete(Job job) {
		jobRepository.delete(job);
	}
}
