package com.dailyeng.security;

import com.dailyeng.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Loads user from PostgreSQL via JPA.
 * The JWT filter uses user ID (not email) as the username/subject.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private static final String DEFAULT_ROLE = "ROLE_USER";

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userId));

        // OAuth-only users have no password — use a non-matchable placeholder
        String password = user.getPassword() != null
                ? user.getPassword()
                : "{noop}OAUTH_USER_NO_PASSWORD";

        return new org.springframework.security.core.userdetails.User(
                user.getId(),
                password,
                List.of(new SimpleGrantedAuthority(DEFAULT_ROLE))
        );
    }
}
