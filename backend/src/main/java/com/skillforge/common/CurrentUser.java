package com.skillforge.common;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Once Monica's JwtAuthenticationFilter populates the SecurityContext with the
 * authenticated user's ID as the principal, every controller pulls the current
 * user through this rather than trusting a userId passed in the request body/path.
 */
@Component
public class CurrentUser {

    public UUID id() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) {
            throw new AccessDeniedExceptionCustom("No authenticated user in context");
        }
        return UUID.fromString(auth.getPrincipal().toString());
    }
}
