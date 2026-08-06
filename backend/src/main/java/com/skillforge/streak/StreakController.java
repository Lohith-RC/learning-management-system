package com.skillforge.streak;

import com.skillforge.common.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@RestController
@RequestMapping("/api/streak")
@RequiredArgsConstructor
public class StreakController {

    private final CurrentUser currentUser;
    private final StreakService streakService;

    @GetMapping
    public ResponseEntity<StreakResponse> getMyStreak() {
        UUID userId = currentUser.id();
        StreakResponse resp = streakService.getForUser(userId);
        return ResponseEntity.ok(resp);
    }

    /**
     * Calendar view of qualifying activity aggregated by date.
     * Optional query params: start (yyyy-MM-dd), end (yyyy-MM-dd). Defaults to last 30 days.
     */
    @GetMapping("/calendar")
    public ResponseEntity<java.util.List<StreakCalendarEntry>> getCalendar(
            @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
            @RequestParam(required = false) java.time.LocalDate start,
            @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
            @RequestParam(required = false) java.time.LocalDate end
    ) {
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.LocalDate defaultEnd = today;
        java.time.LocalDate defaultStart = today.minusDays(29);
        java.time.LocalDate s = start != null ? start : defaultStart;
        java.time.LocalDate e = end != null ? end : defaultEnd;

        if (s.isAfter(e)) {
            throw new IllegalArgumentException("start date must be on or before end date");
        }

        java.util.List<StreakCalendarEntry> entries = streakService.getCalendar(currentUser.id(), s, e);
        return ResponseEntity.ok(entries);
    }
}
