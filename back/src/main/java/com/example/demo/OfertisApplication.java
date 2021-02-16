package com.example.demo;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Scanner;
import java.util.TimeZone;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class OfertisApplication {
	
	private static final String TAB_DELIMITER = "\t";
	
	@Autowired
	private ElasticsearchOperations esOps;
	
	@Autowired
	private JobRepository jobRepository;

	public static void main(String[] args) {
		SpringApplication.run(OfertisApplication.class, args);
	}
	// ONLY NEEDS TO BE RUN THE FIRST TIME IN ORDER TO FILL THE DOCUMENT "JOBS"
	/*
	@PreDestroy
	public void deleteIndex() {
		esOps.indexOps(Job.class).delete();
	}
	*/
	
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}
	// ONLY NEEDS TO BE RUN THE FIRST TIME IN ORDER TO FILL THE DOCUMENT "JOBS"
	/*
	public void buildIndex() {
		esOps.indexOps(Job.class).refresh();
		jobRepository.deleteAll();
		jobRepository.saveAll(prepareDataset());
	}
	*/
	
	@Bean
	public JavaMailSender getJavaMailSender() {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    mailSender.setHost("smtp.gmail.com");
	    mailSender.setPort(587);
	    
	    mailSender.setUsername("yourGMAIL");
	    mailSender.setPassword("yourpassword");
	    
	    Properties props = mailSender.getJavaMailProperties();
	    props.put("mail.transport.protocol", "smtp");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.debug", "true");
	    
	    return mailSender;
	}
	
	@Bean(name="messageSource")
	public ResourceBundleMessageSource bundleMessageSource() {
		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setBasename("messages");
		return messageSource;
	}
	
	private Collection<Job> prepareDataset() {
		Resource resource = new ClassPathResource("jobs-jobs.tsv");
		List<Job> jobList = new ArrayList<Job>();
		
		try (
				InputStream input = resource.getInputStream();
				Scanner scanner = new Scanner(resource.getInputStream());
			)
			{
				
				int lineNo = 0;
				
				while(scanner.hasNextLine()) {
					++lineNo;
					String line = scanner.nextLine();
					if (lineNo == 1) continue;
					Optional<Job> job = csvRowToJobMapper(line);
					if (job.isPresent()) jobList.add(job.get());
				}
				
			} catch (Exception e) {
				log.error("Unable to read the file {}", e);
			}
		return jobList;
	}
	
	private Optional<Job> csvRowToJobMapper(final String line) {
		try(
			Scanner rowScanner = new Scanner(line)
			)
		{
			rowScanner.useDelimiter(TAB_DELIMITER);
			while(rowScanner.hasNext()) {
				String title = rowScanner.next();
				String city = rowScanner.next();
				String description = rowScanner.next();
				String province = rowScanner.next();
				int min_salary = Integer.parseInt(rowScanner.next());
				int max_salary = Integer.parseInt(rowScanner.next());
				String type_salary = rowScanner.next();
				String type_job = rowScanner.next();
				String company = rowScanner.next();
				String img = rowScanner.next();
				boolean reposted = Boolean.parseBoolean(rowScanner.next());
				String user_id = rowScanner.next();
				
				return Optional.of(
						Job.builder()
						.created_at(new Date())
						.updated_at(new Date())
						.title(title)
						.city(city)
						.description(description)
						.province(province)
						.min_salary(min_salary)
						.max_salary(max_salary)
						.type_salary(type_salary)
						.type_job(type_job)
						.company(company)
						.img(img)
						.reposted(reposted)
						.user_id(user_id)
						.build()
						);
				
			}
		}
		return Optional.of(null);
	}
}
