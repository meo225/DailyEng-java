package com.dailyeng.service;

import com.dailyeng.dto.notification.GetNotificationsOptions;
import com.dailyeng.dto.notification.GetNotificationsResponse;
import com.dailyeng.dto.notification.NotificationResult;
import com.dailyeng.entity.Notification;
import com.dailyeng.entity.enums.NotificationType;
import com.dailyeng.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Get notifications for a user with pagination, search, and filter.
     */
    @Transactional(readOnly = true)
    public GetNotificationsResponse getNotifications(String userId, GetNotificationsOptions options) {
        Sort sort = "oldest".equals(options.sortOrder())
                ? Sort.by(Sort.Direction.ASC, "createdAt")
                : Sort.by(Sort.Direction.DESC, "createdAt");

        var pageable = PageRequest.of(options.page() - 1, options.limit(), sort);

        Page<Notification> notificationPage =
                notificationRepository.findByUserIdAndSearchQuery(userId, options.searchQuery(), pageable);

        long unreadCount = notificationRepository.countByUserIdAndIsReadFalse(userId);

        List<NotificationResult> results = notificationPage.getContent().stream()
                .map(this::mapToResult)
                .toList();

        return new GetNotificationsResponse(
                results,
                notificationPage.getTotalElements(),
                notificationPage.getTotalPages(),
                options.page(),
                unreadCount
        );
    }

    /**
     * Mark a single notification as read, verifying it belongs to the given user.
     */
    @Transactional
    public boolean markNotificationAsRead(String userId, String notificationId) {
        return notificationRepository.findByIdAndUserId(notificationId, userId)
                .map(notification -> {
                    notification.setRead(true);
                    notificationRepository.save(notification);
                    return true;
                })
                .orElse(false);
    }

    /**
     * Mark multiple notifications as read (batch), verifying ownership.
     */
    @Transactional
    public int markNotificationsAsRead(String userId, List<String> notificationIds) {
        if (notificationIds == null || notificationIds.isEmpty()) {
            return 0;
        }

        List<Notification> notifications = notificationRepository
                .findByIdInAndUserId(notificationIds, userId).stream()
                .filter(n -> !n.isRead())
                .toList();

        notifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(notifications);
        return notifications.size();
    }

    /**
     * Get unread notification count for a user.
     */
    @Transactional(readOnly = true)
    public long getUnreadNotificationCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    /**
     * Mark all notifications as read for a user.
     */
    @Transactional
    public int markAllNotificationsAsRead(String userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndIsReadFalse(userId);
        if (unreadNotifications.isEmpty()) {
            return 0;
        }

        unreadNotifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
        return unreadNotifications.size();
    }

    /**
     * TEST ONLY: Create a dummy notification.
     */
    @Transactional
    public NotificationResult createTestNotification(String userId, String title, String message, String type) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(NotificationType.valueOf(type));
        notification.setRead(false);
        notification = notificationRepository.save(notification);
        return mapToResult(notification);
    }

    private NotificationResult mapToResult(Notification n) {
        return new NotificationResult(
                n.getId(),
                n.getTitle(),
                n.getMessage(),
                n.getType() != null ? n.getType().name() : null,
                n.isRead(),
                n.getCreatedAt()
        );
    }
}
