package com.family.model;

public class DomainException extends RuntimeException {
    private String field;

    public DomainException(String errorMessage) {
        super(errorMessage);
    }

    public DomainException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
