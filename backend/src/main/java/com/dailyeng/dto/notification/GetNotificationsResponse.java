package com.dailyeng.dto.notification;

import java.util.List;

public class GetNotificationsResponse {
    private List<NotificationResult> notifications;
    private long total;
    private int totalPages;
    private int currentPage;
    private long unreadCount;

    public GetNotificationsResponse() {
    }

    public List<NotificationResult> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<NotificationResult> notifications) {
        this.notifications = notifications;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public long getUnreadCount() {
        return unreadCount;
    }

    public void setUnreadCount(long unreadCount) {
        this.unreadCount = unreadCount;
    }
}
