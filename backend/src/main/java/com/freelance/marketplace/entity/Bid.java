package com.freelance.marketplace.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="bids")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Bid {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Double amount;
    
    @Column(columnDefinition = "TEXT")
    private String proposal;
    
    @Enumerated(EnumType.STRING)
    private BidStatus status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "freelancer_id", nullable = false)
    private User freelancer;
}
