package com.freelance.marketplace.dto;
import lombok.Data;

@Data
public class JobDto {
    private Long id;
    private String title;
    private String description;
    private Double budget;
    private String status;
    private Long clientId;
    private String clientUsername;
}
