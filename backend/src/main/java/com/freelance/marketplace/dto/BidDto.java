package com.freelance.marketplace.dto;
import lombok.Data;

@Data
public class BidDto {
    private Long id;
    private Double amount;
    private String proposal;
    private String status;
    private Long jobId;
    private Long freelancerId;
    private String freelancerUsername;
}
