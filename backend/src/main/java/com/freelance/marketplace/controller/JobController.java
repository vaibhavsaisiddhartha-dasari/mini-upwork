package com.freelance.marketplace.controller;

import com.freelance.marketplace.dto.JobDto;
import com.freelance.marketplace.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<?> createJob(@RequestBody JobDto jobDto, Principal principal) {
        try {
            return ResponseEntity.ok(jobService.saveJob(jobDto, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/open")
    public ResponseEntity<List<JobDto>> getOpenJobs() {
        return ResponseEntity.ok(jobService.getOpenJobs());
    }

    @GetMapping("/myjobs")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<JobDto>> getMyJobs(Principal principal) {
        return ResponseEntity.ok(jobService.getMyJobs(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(jobService.getJobById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
