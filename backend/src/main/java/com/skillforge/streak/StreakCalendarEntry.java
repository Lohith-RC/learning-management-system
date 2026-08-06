package com.skillforge.streak;

import java.time.LocalDate;

/**
 * DTO returned by /api/streak/calendar
 */
public record StreakCalendarEntry(LocalDate date, long count) {
}
