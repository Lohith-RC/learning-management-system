package com.skillforge.profile;

import com.skillforge.common.CurrentUser;
import com.skillforge.profile.dto.ProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final CurrentUser currentUser;

    /**
     * Returns the authenticated student's profile. Ownership is enforced by always
     * resolving the profile for the JWT principal ({@link CurrentUser#id()}).
     */
    @GetMapping({"", "/me"})
    public ProfileResponse getMyProfile() {
        return profileService.getProfile(currentUser.id(), currentUser.id());
    }
}
