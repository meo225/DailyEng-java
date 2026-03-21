package com.dailyeng.controller;

import com.dailyeng.exception.UnauthorizedException;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Base controller providing shared authentication helpers.
 * All controllers requiring user identity should extend this class.
 */
public abstract class BaseController {

    /**
     * Extract userId from SecurityContext if present, otherwise return null.
     * Use for endpoints where authentication is optional.
     */
    protected String extractUserId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName();
        }
        return null;
    }

    /**
     * Require userId from SecurityContext.
     *
     * @return the authenticated user's ID
     * @throws UnauthorizedException if the user is not authenticated
     */
    protected String requireUserId() {
        var userId = extractUserId();
        if (userId == null) {
            throw new UnauthorizedException("Authentication required");
        }
        return userId;
    }
}
