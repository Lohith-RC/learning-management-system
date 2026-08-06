package com.skillforge.common;

import com.skillforge.auth.BadRequestException;
import com.skillforge.auth.UnauthorizedException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

/**
 * Every controller in the backend relies on this — do not add local
 * @ExceptionHandler methods in individual controllers, keep error shape consistent.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
        List<String> details = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .toList();
        return ResponseEntity.badRequest().body(
                ApiError.of(400, "VALIDATION_FAILED", "One or more fields are invalid", details));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiError.of(404, "NOT_FOUND", ex.getMessage(), List.of()));
    }

    @ExceptionHandler(AccessDeniedExceptionCustom.class)
    public ResponseEntity<ApiError> handleAccessDenied(AccessDeniedExceptionCustom ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                ApiError.of(403, "FORBIDDEN", ex.getMessage(), List.of()));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> handleBadRequest(BadRequestException ex) {
        return ResponseEntity.badRequest().body(
                ApiError.of(400, "BAD_REQUEST", ex.getMessage(), List.of()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiError> handleUnauthorized(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ApiError.of(401, "UNAUTHORIZED", ex.getMessage(), List.of()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiError.of(500, "INTERNAL_ERROR", "Something went wrong", List.of()));
    }
}
