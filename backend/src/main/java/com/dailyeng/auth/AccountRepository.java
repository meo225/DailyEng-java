package com.dailyeng.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByProviderAndProviderAccountId(String provider, String providerAccountId);
    java.util.List<Account> findByUserId(String userId);
}
