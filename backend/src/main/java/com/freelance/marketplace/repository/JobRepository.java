package com.freelance.marketplace.repository;
import com.freelance.marketplace.entity.Job;
import com.freelance.marketplace.entity.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByClientId(Long clientId);
    List<Job> findByStatus(JobStatus status);
}
