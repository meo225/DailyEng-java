package com.dailyeng.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SrsCardDto {
    private String id;
    private String front;
    private String back;
    private int interval; // days
    private double easeFactor; // 1.3 - 2.5
    private int repetitions;
    private LocalDateTime nextReviewDate;
    private LocalDateTime lastReviewDate;
}
