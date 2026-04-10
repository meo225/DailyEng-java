package com.dailyeng.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Global exception handler providing consistent JSON error responses.
 * Uses sealed interface pattern for type-safe error response variants.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Standard error response structure.
     */
    public record ErrorResponse(
            boolean success,
            String error,
            int status,
            Instant timestamp
    ) {
        public static ErrorResponse of(String error, HttpStatus status) {
            return new ErrorResponse(false, error, status.value(), Instant.now());
        }
    }

    /**
     * Validation error response with field-level details.
     */
    public record ValidationErrorResponse(
            boolean success,
            String error,
            Map<String, String> fieldErrors,
            int status,
            Instant timestamp
    ) {}

    // ========================
    // Custom Exceptions
    // ========================

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        log.warn("Resource not found: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.of(ex.getMessage(), HttpStatus.NOT_FOUND));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        log.warn("Bad request: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(ex.getMessage(), HttpStatus.BAD_REQUEST));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex) {
        log.warn("Unauthorized: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of(ex.getMessage(), HttpStatus.UNAUTHORIZED));
    }

    // ========================
    // External Service Exceptions
    // ========================

    @ExceptionHandler(ExternalServiceException.class)
    public ResponseEntity<ErrorResponse> handleExternalService(ExternalServiceException ex) {
        log.warn("External service unavailable: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ErrorResponse.of(
                        "Service temporarily unavailable. Please try again later.",
                        HttpStatus.SERVICE_UNAVAILABLE));
    }

    @ExceptionHandler(io.github.resilience4j.circuitbreaker.CallNotPermittedException.class)
    public ResponseEntity<ErrorResponse> handleCircuitBreakerOpen(
            io.github.resilience4j.circuitbreaker.CallNotPermittedException ex) {
        log.warn("Circuit breaker open: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ErrorResponse.of(
                        "Service temporarily unavailable due to high error rate. Please try again later.",
                        HttpStatus.SERVICE_UNAVAILABLE));
    }

    // ========================
    // Spring Security Exceptions
    // ========================

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of("Invalid email or password", HttpStatus.UNAUTHORIZED));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthentication(AuthenticationException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of("Authentication failed", HttpStatus.UNAUTHORIZED));
    }

    // ========================
    // Validation Exceptions (@Valid)
    // ========================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
            MethodArgumentNotValidException ex
    ) {
        Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        error -> error.getDefaultMessage() != null
                                ? error.getDefaultMessage()
                                : "Invalid value",
                        (existing, replacement) -> existing
                ));

        var response = new ValidationErrorResponse(
                false,
                "Validation failed",
                fieldErrors,
                HttpStatus.BAD_REQUEST.value(),
                Instant.now()
        );

        return ResponseEntity.badRequest().body(response);
    }

    // ========================
    // Catch-all fallback
    // ========================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        log.error("Unexpected error: ", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(
                        "Unexpected Server Error: " + (ex.getMessage() != null ? ex.getMessage() : ex.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR
                ));
    }
}
