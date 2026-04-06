package com.freelance.marketplace.repository;
import com.freelance.marketplace.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByClientId(Long clientId);
    List<Contract> findByFreelancerId(Long freelancerId);
    Optional<Contract> findByJobId(Long jobId);
}
