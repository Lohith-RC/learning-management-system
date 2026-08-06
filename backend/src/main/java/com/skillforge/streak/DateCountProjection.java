package com.skillforge.streak;

import java.sql.Date;

/**
 * Projection for native queries returning a date and a count.
 */
public interface DateCountProjection {
    Date getDay();
    Long getCnt();
}
