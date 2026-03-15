package com.dailyeng.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Custom UserDetailsService that loads user from PostgreSQL via JPA.
 * <p>
 * For now, this is a placeholder that will be connected to UserRepository
 * once entities are created in Phase 2. The JWT filter uses user ID
 * (not email) as the username/subject.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    // TODO: Wire UserRepository in Phase 2
    // private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // Placeholder: will query UserRepository in Phase 2
        // For now, return a basic UserDetails to allow the security chain to compile
        //
        // Phase 2 implementation:
        // var user = userRepository.findById(userId)
        //     .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userId));
        // return new User(user.getId(), user.getPassword() != null ? user.getPassword() : "",
        //     List.of(new SimpleGrantedAuthority("ROLE_USER")));

        throw new UsernameNotFoundException("User not found with id: " + userId);
    }
}
