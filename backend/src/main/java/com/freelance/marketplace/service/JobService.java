package com.freelance.marketplace.service;

import com.freelance.marketplace.dto.JobDto;
import com.freelance.marketplace.entity.Job;
import com.freelance.marketplace.entity.JobStatus;
import com.freelance.marketplace.entity.User;
import com.freelance.marketplace.repository.JobRepository;
import com.freelance.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;

    public JobDto saveJob(JobDto jobDto, String username) {
        User client = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Job job = new Job();
        job.setTitle(jobDto.getTitle());
        job.setDescription(jobDto.getDescription());
        job.setBudget(jobDto.getBudget());
        job.setStatus(JobStatus.OPEN);
        job.setClient(client);
        
        Job saved = jobRepository.save(job);
        return mapToDto(saved);
    }

    public List<JobDto> getAllJobs() {
        return jobRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }
    
    public List<JobDto> getOpenJobs() {
        return jobRepository.findByStatus(JobStatus.OPEN).stream().map(this::mapToDto).collect(Collectors.toList());
    }
    
    public List<JobDto> getMyJobs(String username) {
        User client = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return jobRepository.findByClientId(client.getId()).stream().map(this::mapToDto).collect(Collectors.toList());
    }
    
    public JobDto getJobById(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        return mapToDto(job);
    }

    private JobDto mapToDto(Job job) {
        JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setBudget(job.getBudget());
        dto.setStatus(job.getStatus().name());
        dto.setClientId(job.getClient().getId());
        dto.setClientUsername(job.getClient().getUsername());
        return dto;
    }
}
