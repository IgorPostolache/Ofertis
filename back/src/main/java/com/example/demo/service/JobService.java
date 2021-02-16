package com.example.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.demo.exception.BadRequestException;
import com.example.demo.model.Job;
import com.example.demo.model.Subscription;
import com.example.demo.repository.JobRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JobService {
	private static final String JOB_INDEX = "jobs";
	@Autowired
	private ElasticsearchOperations esOP;
	
	@Autowired
	private JobRepository jobRepository;
	
	@Autowired
	ElasticsearchOperations  elasticsearchTemplate;
	
	public void add(Job job) {
		jobRepository.save(job);
	}
	
	public void delete(String id) {
		Job job = jobRepository.findById(id).orElseThrow(
				() -> new BadRequestException("No job found by id " + id));
		jobRepository.deleteById(id);
	}

	public List<Job> fuzzySearch(String query) {
		QueryBuilder queryBuilder = 
				QueryBuilders.multiMatchQuery(
						query, "title", "city", "province", "company", "type_job")
				.fuzziness(Fuzziness.AUTO);
		
		Query searchQuery = new NativeSearchQueryBuilder().withFilter(queryBuilder).build();
		
		SearchHits<Job> jobHits = 
				esOP.search(searchQuery, Job.class, IndexCoordinates.of(JOB_INDEX));
		
		List<Job> jobList = new ArrayList<Job>();
		jobHits.forEach(hit-> jobList.add(hit.getContent()));
		
		return jobList;
	}
	
	public List<Job> loadAll() {
		return jobRepository.findAll();
	}

	public Optional<Job> loadById(String id) {
		return jobRepository.findById(id);
	}
	
	public Job update(Job jobReq) {
		Job job = jobRepository.findById(jobReq.getId()).orElseThrow(
				() -> new BadRequestException("No job found by id " + jobReq.getId()));
        jobReq.setCreated_at(job.getCreated_at());
        jobReq.setUpdated_at(new Date());
		return jobRepository.save(jobReq);
	}
}
