package com.example.demo.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "jobs")
public class Job {
	@Id
	private String id;

	@Field(name = "created_at", type = FieldType.Date, format = DateFormat.custom, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date created_at;

    @Field(name = "updated_at", type = FieldType.Date, format = DateFormat.custom, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date updated_at;
	
	@Field(type = FieldType.Text, name = "title")
	private String title;
	
	@Field(type = FieldType.Text, name = "city")
	private String city;
	
	@Field(type = FieldType.Text, name = "description")
	private String description;
	
	@Field(type = FieldType.Text, name = "province")
	private String province;
	
	@Field(type = FieldType.Integer, name = "min_salary")
	private int min_salary;
	
	@Field(type = FieldType.Integer, name = "max_salary")
	private int max_salary;
	
	@Field(type = FieldType.Text, name = "type_salary")
	private String type_salary;
	
	@Field(type = FieldType.Text, name = "type_job")
	private String type_job;
	
	@Field(type = FieldType.Text, name = "company")
	private String company;
	
	@Field(type = FieldType.Text, name = "img")
	private String img;
	
	@Field(type = FieldType.Boolean, name = "reposted")
	private Boolean reposted;
	
	@Field(type = FieldType.Text, name = "user_id")
	private String user_id;
	
}
