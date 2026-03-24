package com.dailyeng.common.enums;

/**
 * Quiz type enum. Prisma uses @map for DB values:
 * multiple_choice -> "multiple-choice", fill_blank -> "fill-blank", matching -> "matching"
 *
 * Since PostgreSQL stores the mapped string values, we need a converter.
 */
public enum QuizType {
    multiple_choice("multiple-choice"),
    fill_blank("fill-blank"),
    matching("matching");

    private final String dbValue;

    QuizType(String dbValue) {
        this.dbValue = dbValue;
    }

    public String getDbValue() {
        return dbValue;
    }

    public static QuizType fromDbValue(String dbValue) {
        for (QuizType type : values()) {
            if (type.dbValue.equals(dbValue)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown QuizType db value: " + dbValue);
    }
}
