package com.dailyeng.controller;

import com.dailyeng.dto.notification.GetNotificationsOptions;
import com.dailyeng.dto.notification.GetNotificationsResponse;
import com.dailyeng.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /** GET /api/notifications */
    @GetMapping
    public ResponseEntity<GetNotificationsResponse> getNotifications(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer limit,
            @RequestParam(required = false, defaultValue = "newest") String sortOrder,
            @RequestParam(required = false, defaultValue = "") String searchQuery,
            HttpServletRequest request
    ) {
        String userId = requireUserId(request);
        GetNotificationsOptions options = new GetNotificationsOptions();
        options.setPage(page);
        options.setLimit(limit);
        options.setSortOrder(sortOrder);
        options.setSearchQuery(searchQuery);

        return ResponseEntity.ok(notificationService.getNotifications(userId, options));
    }

    /** PATCH /api/notifications/{id}/read */
    @PatchMapping("/{id}/read")
    public ResponseEntity<Map<String, Boolean>> markAsRead(
            @PathVariable String id,
            HttpServletRequest request
    ) {
        requireUserId(request); // Verify Auth
        boolean success = notificationService.markNotificationAsRead(id);
        return ResponseEntity.ok(Map.of("success", success));
    }

    /** PATCH /api/notifications/read-batch */
    @PatchMapping("/read-batch")
    public ResponseEntity<Map<String, Object>> markBatchAsRead(
            @RequestBody List<String> notificationIds,
            HttpServletRequest request
    ) {
        requireUserId(request);
        int count = notificationService.markNotificationsAsRead(notificationIds);
        return ResponseEntity.ok(Map.of("success", true, "count", count));
    }

    /** GET /api/notifications/unread-count */
    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(HttpServletRequest request) {
        String userId = requireUserId(request);
        return ResponseEntity.ok(notificationService.getUnreadNotificationCount(userId));
    }

    /** PATCH /api/notifications/read-all */
    @PatchMapping("/read-all")
    public ResponseEntity<Map<String, Object>> markAllAsRead(HttpServletRequest request) {
        String userId = requireUserId(request);
        int count = notificationService.markAllNotificationsAsRead(userId);
        return ResponseEntity.ok(Map.of("success", true, "count", count));
    }

    /** POST /api/notifications/test-create -> FOR TESTING IN POSTMAN */
    @PostMapping("/test-create")
    public ResponseEntity<?> createTestNotification(
            @RequestBody Map<String, String> payload,
            HttpServletRequest request
    ) {
        String userId = requireUserId(request);
        String title = payload.getOrDefault("title", "Test Notification");
        String message = payload.getOrDefault("message", "This is a dummy notification created via Postman!");
        String type = payload.getOrDefault("type", "system");

        return ResponseEntity.ok(notificationService.createTestNotification(userId, title, message, type));
    }

    /**
     * Require userId from SecurityContext (throws 401 if not present).
     */
    private String requireUserId(HttpServletRequest request) {
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName(); // userId from JWT subject
        }
        throw new com.dailyeng.exception.UnauthorizedException("Authentication required");
    }
}
