package com.dailyeng.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Automatically parses the standard Prisma DATABASE_URL (postgresql://user:pass@host:port/db)
 * and configures the Spring Boot DataSource, eliminating the need for separate
 * SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, and SPRING_DATASOURCE_PASSWORD variables.
 */
@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:postgresql://postgres:postgres@localhost:5432/dailyeng}")
    private String databaseUrl;

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        URI dbUri = new URI(databaseUrl);

        String username = null;
        String password = null;
        if (dbUri.getUserInfo() != null) {
            String[] credentials = dbUri.getUserInfo().split(":", 2);
            username = credentials[0];
            if (credentials.length > 1) {
                password = credentials[1];
            }
        }

        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + 
                       (dbUri.getPort() != -1 ? ":" + dbUri.getPort() : "") + 
                       dbUri.getPath() + 
                       (dbUri.getQuery() != null ? "?" + dbUri.getQuery() : "");

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(dbUrl);
        if (username != null) config.setUsername(username);
        if (password != null) config.setPassword(password);
        
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setIdleTimeout(300000);
        config.setConnectionTimeout(20000);

        return new HikariDataSource(config);
    }
}
