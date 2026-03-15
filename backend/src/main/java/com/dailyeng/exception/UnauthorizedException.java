package com.dailyeng.exception;

/**
 * Thrown when a user is not authenticated or not authorized for an action.
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }
}
