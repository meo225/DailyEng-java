package com.dailyeng.common.exception;

/**
 * Thrown when a request has invalid or missing parameters.
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
