package com.freelance.marketplace.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name="jobs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Double budget;
    
    @Enumerated(EnumType.STRING)
    private JobStatus status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;
    
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private List<Bid> bids;
}
