package com.dailyeng.entity.enums;

/**
 * Types of user notifications.
 *
 * <p>Values are lowercase to match the PostgreSQL {@code "NotificationType"} enum.
 * Do <b>not</b> rename these constants without a corresponding database migration.
 */
public enum NotificationType {
    notebook,
    plan,
    achievement,
    system
}
