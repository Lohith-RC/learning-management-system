package com.skillforge.common;

import org.owasp.html.HtmlPolicyBuilder;
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;
import org.springframework.stereotype.Component;

/**
 * Every service that stores user-authored rich text (Article.content, and later
 * anything else editable via the admin rich-text editor) MUST run it through this
 * before persisting. This is the concrete implementation of the "sanitize
 * rich-text/article content on write to prevent stored XSS" security responsibility.
 */
@Component
public class ContentSanitizer {

    // Allow the tags/attrs a course article legitimately needs:
    // headings, paragraphs, lists, code blocks, tables, images, links.
    private final PolicyFactory policy = Sanitizers.FORMATTING
            .and(Sanitizers.BLOCKS)
            .and(Sanitizers.LINKS)
            .and(Sanitizers.IMAGES)
            .and(Sanitizers.TABLES)
            .and(new HtmlPolicyBuilder()
                    .allowElements("pre", "code", "span")
                    .allowAttributes("class").onElements("pre", "code", "span") // for syntax-highlighting classes
                    .toFactory());

    public String sanitize(String rawHtml) {
        if (rawHtml == null) return null;
        return policy.sanitize(rawHtml);
    }
}
