package com.dailyeng.service;

import com.dailyeng.dto.notification.GetNotificationsOptions;
import com.dailyeng.dto.notification.GetNotificationsResponse;
import com.dailyeng.dto.notification.NotificationResult;
import com.dailyeng.entity.Notification;
import com.dailyeng.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Get notifications for a user with pagination, search, and filter
     */
    @Transactional(readOnly = true)
    public GetNotificationsResponse getNotifications(String userId, GetNotificationsOptions options) {
        int page = options.getPage() != null && options.getPage() > 0 ? options.getPage() : 1;
        int limit = options.getLimit() != null && options.getLimit() > 0 ? options.getLimit() : 10;
        String sortOrder = "oldest".equalsIgnoreCase(options.getSortOrder()) ? "oldest" : "newest";
        String searchQuery = options.getSearchQuery() != null ? options.getSearchQuery().trim() : "";

        Sort sort = "oldest".equals(sortOrder) ? Sort.by(Sort.Direction.ASC, "createdAt") : Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, limit, sort);

        // Fetch notifications with pagination and search
        Page<Notification> notificationPage = notificationRepository.findByUserIdAndSearchQuery(userId, searchQuery, pageable);

        long unreadCount = notificationRepository.countByUserIdAndIsReadFalse(userId);

        List<NotificationResult> results = notificationPage.getContent().stream()
                .map(this::mapToResult)
                .collect(Collectors.toList());

        GetNotificationsResponse response = new GetNotificationsResponse();
        response.setNotifications(results);
        response.setTotal(notificationPage.getTotalElements());
        response.setTotalPages(notificationPage.getTotalPages());
        response.setCurrentPage(page);
        response.setUnreadCount(unreadCount);

        return response;
    }

    /**
     * Mark a single notification as read
     */
    @Transactional
    public boolean markNotificationAsRead(String notificationId) {
        return notificationRepository.findById(notificationId)
                .map(notification -> {
                    notification.setRead(true);
                    notificationRepository.save(notification);
                    return true;
                }).orElse(false);
    }

    /**
     * Mark multiple notifications as read (batch operation)
     */
    @Transactional
    public int markNotificationsAsRead(List<String> notificationIds) {
        if (notificationIds == null || notificationIds.isEmpty()) return 0;

        List<Notification> notifications = notificationRepository.findAllById(notificationIds).stream()
                .filter(n -> !n.isRead())
                .collect(Collectors.toList());

        notifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(notifications);
        return notifications.size();
    }

    /**
     * Get unread notification count for a user
     */
    @Transactional(readOnly = true)
    public long getUnreadNotificationCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    /**
     * Mark all notifications as read for a user
     */
    @Transactional
    public int markAllNotificationsAsRead(String userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndIsReadFalse(userId);
        if (unreadNotifications.isEmpty()) return 0;
        
        unreadNotifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
        return unreadNotifications.size();
    }

    // Helper map function
    private NotificationResult mapToResult(Notification n) {
        NotificationResult result = new NotificationResult();
        result.setId(n.getId());
        result.setTitle(n.getTitle());
        result.setMessage(n.getMessage());
        result.setType(n.getType() != null ? n.getType().name() : null);
        result.setRead(n.isRead());
        result.setCreatedAt(n.getCreatedAt());
        return result;
    }

    /**
     * TEST ONLY: Create a dummy notification
     */
    @Transactional
    public NotificationResult createTestNotification(String userId, String title, String message, String type) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(com.dailyeng.entity.enums.NotificationType.valueOf(type));
        notification.setRead(false);
        notification = notificationRepository.save(notification);
        return mapToResult(notification);
    }
}
