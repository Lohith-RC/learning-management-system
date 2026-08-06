package com.skillforge.streak;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StreakService {

    private final StreakRepository streakRepository;
    private final StreakActivityRepository activityRepository;

    /**
     * Update the streak for the given user when they perform a qualifying activity.
     * Rules:
     * - same day -> do nothing
     * - consecutive day -> increment current streak
     * - missed day(s) -> reset current streak to 1
     * - update longest streak as appropriate
     */
    public void updateStreak(UUID userId) {
        LocalDate today = LocalDate.now();

        Streak streak = streakRepository.findById(userId).orElseGet(() -> {
            Streak s = new Streak();
            s.setUserId(userId);
            s.setCurrentStreak(0);
            s.setLongestStreak(0);
            s.setLastActiveDate(null);
            return s;
        });

        LocalDate last = streak.getLastActiveDate();
        if (last != null) {
            long days = ChronoUnit.DAYS.between(last, today);
            if (days == 0) {
                // already active today - nothing to do
                return;
            } else if (days == 1) {
                streak.setCurrentStreak(streak.getCurrentStreak() + 1);
            } else {
                // missed one or more days -> reset to 1
                streak.setCurrentStreak(1);
            }
        } else {
            // first-time activity recorded
            streak.setCurrentStreak(1);
        }

        // update longest streak
        if (streak.getCurrentStreak() > streak.getLongestStreak()) {
            streak.setLongestStreak(streak.getCurrentStreak());
        }

        streak.setLastActiveDate(today);
        streakRepository.save(streak);
    }

    /**
     * Retrieve streak for display. If the streak has expired (lastActiveDate is more than one day ago),
     * currentStreak is shown as 0 without modifying the database.
     */
    @Transactional(readOnly = true)
    public StreakResponse getForUser(UUID userId) {
        Optional<Streak> opt = streakRepository.findById(userId);
        if (opt.isEmpty()) {
            return new StreakResponse(0, 0, null);
        }
        Streak s = opt.get();
        LocalDate last = s.getLastActiveDate();
        if (last == null) {
            return new StreakResponse(0, s.getLongestStreak(), null);
        }
        long days = ChronoUnit.DAYS.between(last, LocalDate.now());
        int displayCurrent = days > 1 ? 0 : s.getCurrentStreak();
        return new StreakResponse(displayCurrent, s.getLongestStreak(), s.getLastActiveDate());
    }

    /**
     * Aggregate qualifying user activity (assessments submitted + course completions)
     * by date and return a list of StreakCalendarEntry for the given inclusive
     * date range. startDate and endDate are LocalDate in the server timezone.
     */
    @Transactional(readOnly = true)
    public List<StreakCalendarEntry> getCalendar(UUID userId, java.time.LocalDate startDate, java.time.LocalDate endDate) {
        // convert LocalDate range to Instant range in UTC (start inclusive, end exclusive)
        java.time.ZoneOffset zone = java.time.ZoneOffset.UTC;
        java.time.Instant startInstant = startDate.atStartOfDay().toInstant(zone);
        java.time.Instant endInstant = endDate.plusDays(1).atStartOfDay().toInstant(zone);

        List<DateCountProjection> attempts = activityRepository.countAttemptsGroupedByDay(userId, startInstant, endInstant);
        List<DateCountProjection> completions = activityRepository.countCourseCompletionsGroupedByDay(userId, startInstant, endInstant);

        java.util.Map<java.time.LocalDate, Long> map = new java.util.HashMap<>();

        for (DateCountProjection p : attempts) {
            java.time.LocalDate d = p.getDay().toLocalDate();
            map.put(d, map.getOrDefault(d, 0L) + (p.getCnt() != null ? p.getCnt() : 0L));
        }
        for (DateCountProjection p : completions) {
            java.time.LocalDate d = p.getDay().toLocalDate();
            map.put(d, map.getOrDefault(d, 0L) + (p.getCnt() != null ? p.getCnt() : 0L));
        }

        return map.entrySet().stream()
                .map(e -> new StreakCalendarEntry(e.getKey(), e.getValue()))
                .sorted(java.util.Comparator.comparing(StreakCalendarEntry::date))
                .toList();
    }
}
