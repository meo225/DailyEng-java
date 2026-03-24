package com.dailyeng.content;

import java.util.List;

/**
 * All Dictionary search DTOs as Java 21 records.
 */
public final class DictionaryDtos {

    private DictionaryDtos() {}

    // ============================== Responses ==============================

    public record DictionaryWordResult(
            String id,
            String word,
            String pronunciation,
            String meaning,
            String vietnameseMeaning,
            String partOfSpeech,
            String level,
            String exampleSentence,
            String exampleTranslation
    ) {}

    public record DictionaryGrammarResult(
            String id,
            String title,
            String explanation,
            Object examples,
            String level,
            String category
    ) {}

    public record DictionaryWordSearchResponse(
            List<DictionaryWordResult> results,
            int total
    ) {}

    public record DictionaryGrammarSearchResponse(
            List<DictionaryGrammarResult> results,
            int total
    ) {}
}
