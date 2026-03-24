package com.dailyeng.service;

import com.dailyeng.entity.Notification;
import com.dailyeng.entity.enums.NotificationType;
import com.dailyeng.repository.NotificationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link NotificationService}.
 */
@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock private NotificationRepository notificationRepository;

    @InjectMocks private NotificationService notificationService;

    private static final String USER_ID = "user-123";

    private Notification createNotification(String id, boolean isRead) {
        var n = Notification.builder()
                .userId(USER_ID)
                .title("Test Title")
                .message("Test Message")
                .type(NotificationType.system)
                .isRead(isRead)
                .createdAt(LocalDateTime.now())
                .build();
        n.setId(id);
        return n;
    }

    // ========================================================================
    // markNotificationAsRead (single)
    // ========================================================================

    @Test
    @DisplayName("markNotificationAsRead returns true when notification exists and belongs to user")
    void markAsReadSuccess() {
        var notification = createNotification("n-1", false);
        when(notificationRepository.findByIdAndUserId("n-1", USER_ID))
                .thenReturn(Optional.of(notification));
        when(notificationRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        boolean result = notificationService.markNotificationAsRead(USER_ID, "n-1");

        assertTrue(result);
        assertTrue(notification.isRead());
        verify(notificationRepository).save(notification);
    }

    @Test
    @DisplayName("markNotificationAsRead returns false when notification not found")
    void markAsReadNotFound() {
        when(notificationRepository.findByIdAndUserId("n-999", USER_ID))
                .thenReturn(Optional.empty());

        boolean result = notificationService.markNotificationAsRead(USER_ID, "n-999");

        assertFalse(result);
        verify(notificationRepository, never()).save(any());
    }

    // ========================================================================
    // markNotificationsAsRead (batch)
    // ========================================================================

    @Test
    @DisplayName("markNotificationsAsRead marks only unread notifications")
    void batchMarkAsRead() {
        var unread = createNotification("n-1", false);
        var alreadyRead = createNotification("n-2", true);

        when(notificationRepository.findByIdInAndUserId(List.of("n-1", "n-2"), USER_ID))
                .thenReturn(List.of(unread, alreadyRead));

        int count = notificationService.markNotificationsAsRead(USER_ID, List.of("n-1", "n-2"));

        assertEquals(1, count); // Only n-1 was unread
        assertTrue(unread.isRead());
        verify(notificationRepository).saveAll(any());
    }

    @Test
    @DisplayName("markNotificationsAsRead returns 0 for null input")
    void batchMarkAsReadNull() {
        int count = notificationService.markNotificationsAsRead(USER_ID, null);
        assertEquals(0, count);
        verify(notificationRepository, never()).findByIdInAndUserId(any(), any());
    }

    @Test
    @DisplayName("markNotificationsAsRead returns 0 for empty list")
    void batchMarkAsReadEmpty() {
        int count = notificationService.markNotificationsAsRead(USER_ID, List.of());
        assertEquals(0, count);
    }

    // ========================================================================
    // markAllNotificationsAsRead
    // ========================================================================

    @Test
    @DisplayName("markAllNotificationsAsRead marks all unread and returns count")
    void markAllAsRead() {
        var n1 = createNotification("n-1", false);
        var n2 = createNotification("n-2", false);
        when(notificationRepository.findByUserIdAndIsReadFalse(USER_ID))
                .thenReturn(List.of(n1, n2));

        int count = notificationService.markAllNotificationsAsRead(USER_ID);

        assertEquals(2, count);
        assertTrue(n1.isRead());
        assertTrue(n2.isRead());
        verify(notificationRepository).saveAll(any());
    }

    @Test
    @DisplayName("markAllNotificationsAsRead returns 0 when all are already read")
    void markAllAlreadyRead() {
        when(notificationRepository.findByUserIdAndIsReadFalse(USER_ID))
                .thenReturn(List.of());

        int count = notificationService.markAllNotificationsAsRead(USER_ID);

        assertEquals(0, count);
        verify(notificationRepository, never()).saveAll(any());
    }

    // ========================================================================
    // getUnreadNotificationCount
    // ========================================================================

    @Test
    @DisplayName("getUnreadNotificationCount delegates to repository")
    void unreadCount() {
        when(notificationRepository.countByUserIdAndIsReadFalse(USER_ID)).thenReturn(5L);

        long count = notificationService.getUnreadNotificationCount(USER_ID);

        assertEquals(5, count);
    }
}
