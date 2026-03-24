package com.dailyeng.auth;

import com.dailyeng.config.AppProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * Email service using Spring Mail + Thymeleaf templates.
 * Replaces Resend from the Next.js implementation.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final AppProperties appProperties;

    /**
     * Send password reset email with HTML template.
     * Runs async to avoid blocking the request thread.
     */
    @Async
    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        var resetLink = appProperties.getFrontendUrl() + "/auth/reset-password?token=" + resetToken;

        var context = new Context();
        context.setVariable("resetLink", resetLink);
        context.setVariable("year", java.time.Year.now().getValue());

        var htmlContent = templateEngine.process("email/password-reset", context);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("DailyEng <security@dailyeng.me>");
            helper.setTo(toEmail);
            helper.setSubject("Reset Your Password - DailyEng");
            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Password reset email sent to {}", toEmail);
        } catch (MessagingException e) {
            log.error("Failed to send password reset email to {}: {}", toEmail, e.getMessage());
        }
    }
}
