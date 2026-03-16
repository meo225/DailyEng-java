package com.dailyeng.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class AppPropertiesTest {

    @Test
    void testValidateThrowsExceptionWhenSecretIsMissing() {
        AppProperties properties = new AppProperties();
        properties.getJwt().setSecret(null);
        assertThrows(IllegalStateException.class, properties::validate);
    }

    @Test
    void testValidateThrowsExceptionWhenSecretIsShort() {
        AppProperties properties = new AppProperties();
        properties.getJwt().setSecret("short");
        assertThrows(IllegalStateException.class, properties::validate);
    }

    @Test
    void testValidatePassesWhenSecretIsLongEnough() {
        AppProperties properties = new AppProperties();
        properties.getJwt().setSecret("this-is-a-sufficiently-long-secret-key-that-will-pass");
        properties.validate(); // Should not throw
    }
}
