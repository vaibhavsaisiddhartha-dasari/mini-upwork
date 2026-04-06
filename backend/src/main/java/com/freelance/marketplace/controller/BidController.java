package com.freelance.marketplace.controller;

import com.freelance.marketplace.dto.BidDto;
import com.freelance.marketplace.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<?> placeBid(@RequestBody BidDto bidDto, Principal principal) {
        try {
            return ResponseEntity.ok(bidService.placeBid(bidDto, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getBidsForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(bidService.getBidsForJob(jobId));
    }

    @GetMapping("/mybids")
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<?> getMyBids(Principal principal) {
        return ResponseEntity.ok(bidService.getMyBids(principal.getName()));
    }

    @PostMapping("/{bidId}/accept")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<?> acceptBid(@PathVariable Long bidId, Principal principal) {
        try {
            return ResponseEntity.ok(bidService.acceptBid(bidId, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
