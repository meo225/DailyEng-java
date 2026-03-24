package com.dailyeng.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * Async configuration using Java 21 virtual threads.
 * Provides a dedicated executor for CPU-intensive audio processing.
 */
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "audioProcessingExecutor")
    public Executor audioProcessingExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
