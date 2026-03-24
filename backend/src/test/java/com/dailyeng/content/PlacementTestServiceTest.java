package com.dailyeng.content;

import com.dailyeng.content.PlacementTestDtos.*;
import com.dailyeng.common.enums.Level;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PlacementTestServiceTest {

    @Mock private PlacementTestResultRepository resultRepository;
    @InjectMocks private PlacementTestService service;

    @Test
    void submitResult_savesAndReturns() {
        var breakdown = Map.<String, Object>of("vocabulary", 80, "grammar", 70);
        var request = new SubmitPlacementTestRequest(75, "B2", breakdown);

        var saved = PlacementTestResult.builder()
                .userId("user-1")
                .score(75)
                .level(Level.B2)
                .breakdown(breakdown)
                .build();
        saved.setId("result-1");
        saved.setCreatedAt(LocalDateTime.now());

        when(resultRepository.save(any(PlacementTestResult.class))).thenReturn(saved);

        var response = service.submitResult("user-1", "en", request);
        assertThat(response.id()).isEqualTo("result-1");
        assertThat(response.score()).isEqualTo(75);
        assertThat(response.level()).isEqualTo("B2");
    }

    @Test
    void getResults_returnsOrderedList() {
        var r1 = PlacementTestResult.builder()
                .userId("user-1").score(60).level(Level.B1).build();
        r1.setId("r1");
        r1.setCreatedAt(LocalDateTime.now().minusDays(1));

        var r2 = PlacementTestResult.builder()
                .userId("user-1").score(80).level(Level.C1).build();
        r2.setId("r2");
        r2.setCreatedAt(LocalDateTime.now());

        when(resultRepository.findByUserIdAndLanguageOrderByCreatedAtDesc("user-1", "en"))
                .thenReturn(List.of(r2, r1));

        var response = service.getResults("user-1", "en");
        assertThat(response.total()).isEqualTo(2);
        assertThat(response.results().get(0).id()).isEqualTo("r2");
        assertThat(response.results().get(1).level()).isEqualTo("B1");
    }

    @Test
    void mapLevel_validAndInvalid() {
        assertThat(PlacementTestService.mapLevel("B2")).isEqualTo(Level.B2);
        assertThat(PlacementTestService.mapLevel("c1")).isEqualTo(Level.C1);
        assertThat(PlacementTestService.mapLevel("INVALID")).isEqualTo(Level.A1);
        assertThat(PlacementTestService.mapLevel(null)).isEqualTo(Level.A1);
    }
}
