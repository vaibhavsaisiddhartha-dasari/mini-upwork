package com.freelance.marketplace.repository;
import com.freelance.marketplace.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByJobId(Long jobId);
    List<Bid> findByFreelancerId(Long freelancerId);
}
