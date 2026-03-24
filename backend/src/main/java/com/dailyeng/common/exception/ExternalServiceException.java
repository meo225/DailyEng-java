package com.dailyeng.common.exception;

/**
 * Thrown when an external service (Azure Speech, Gemini, etc.) is unavailable
 * due to circuit breaker activation or repeated failures.
 */
public class ExternalServiceException extends RuntimeException {

    public ExternalServiceException(String message) {
        super(message);
    }

    public ExternalServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
