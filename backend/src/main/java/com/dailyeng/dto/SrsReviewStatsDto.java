package com.dailyeng.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SrsReviewStatsDto {
    private int due;
    private int newCards;
    private int learning;
    private int review;
    private int total;
}
