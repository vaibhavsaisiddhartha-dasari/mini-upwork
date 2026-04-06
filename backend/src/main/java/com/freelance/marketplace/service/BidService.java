package com.freelance.marketplace.service;

import com.freelance.marketplace.dto.BidDto;
import com.freelance.marketplace.entity.Bid;
import com.freelance.marketplace.entity.BidStatus;
import com.freelance.marketplace.entity.Job;
import com.freelance.marketplace.entity.User;
import com.freelance.marketplace.repository.BidRepository;
import com.freelance.marketplace.repository.JobRepository;
import com.freelance.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public BidDto placeBid(BidDto bidDto, String username) {
        User freelancer = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Job job = jobRepository.findById(bidDto.getJobId())
            .orElseThrow(() -> new RuntimeException("Job not found"));
            
        Bid bid = new Bid();
        bid.setAmount(bidDto.getAmount());
        bid.setProposal(bidDto.getProposal());
        bid.setStatus(BidStatus.PENDING);
        bid.setJob(job);
        bid.setFreelancer(freelancer);
        
        Bid saved = bidRepository.save(bid);
        return mapToDto(saved);
    }

    public List<BidDto> getBidsForJob(Long jobId) {
        return bidRepository.findByJobId(jobId).stream().map(this::mapToDto).collect(Collectors.toList());
    }
    
    public List<BidDto> getMyBids(String username) {
        User freelancer = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return bidRepository.findByFreelancerId(freelancer.getId()).stream().map(this::mapToDto).collect(Collectors.toList());
    }
    
    public BidDto acceptBid(Long bidId, String currentUsername) {
        Bid bid = bidRepository.findById(bidId).orElseThrow(() -> new RuntimeException("Bid not found"));
        if (!bid.getJob().getClient().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Only the job client can accept a bid");
        }
        bid.setStatus(BidStatus.ACCEPTED);
        return mapToDto(bidRepository.save(bid));
    }

    private BidDto mapToDto(Bid bid) {
        BidDto dto = new BidDto();
        dto.setId(bid.getId());
        dto.setAmount(bid.getAmount());
        dto.setProposal(bid.getProposal());
        dto.setStatus(bid.getStatus().name());
        dto.setJobId(bid.getJob().getId());
        dto.setFreelancerId(bid.getFreelancer().getId());
        dto.setFreelancerUsername(bid.getFreelancer().getUsername());
        return dto;
    }
}
