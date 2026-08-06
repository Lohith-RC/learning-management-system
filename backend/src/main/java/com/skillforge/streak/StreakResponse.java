package com.skillforge.streak;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Immutable DTO returned by the streak endpoints.
 */
public record StreakResponse(int currentStreak, int longestStreak, LocalDate lastActiveDate) {
}
