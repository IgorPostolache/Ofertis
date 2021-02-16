package com.example.demo.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Job;

@Repository
public interface JobRepository extends ElasticsearchRepository<Job, String> {
	List<Job> findAll();
}
