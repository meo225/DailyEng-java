package com.dailyeng.content;

import com.dailyeng.content.DictionaryDtos.*;
import com.dailyeng.grammar.GrammarNote;
import com.dailyeng.vocabulary.VocabItem;
import com.dailyeng.grammar.GrammarNoteRepository;
import com.dailyeng.vocabulary.VocabItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * Dictionary search service — searches VocabItem and GrammarNote tables
 * for the notebook quick-add feature.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DictionaryService {

    private final VocabItemRepository vocabItemRepository;
    private final GrammarNoteRepository grammarNoteRepository;

    /**
     * Search vocabulary words by word (case-insensitive substring match).
     */
    public DictionaryWordSearchResponse searchWords(String query, int limit) {
        if (query == null || query.trim().length() < 2) {
            return new DictionaryWordSearchResponse(Collections.emptyList(), 0);
        }

        var pageable = PageRequest.of(0, Math.min(limit, 50));
        List<VocabItem> items = vocabItemRepository
                .findByWordContainingIgnoreCaseOrderByWordAsc(query.trim(), pageable);

        var results = items.stream()
                .map(this::toWordResult)
                .toList();

        return new DictionaryWordSearchResponse(results, results.size());
    }

    /**
     * Search grammar rules by title (case-insensitive substring match).
     */
    public DictionaryGrammarSearchResponse searchGrammar(String query, int limit) {
        if (query == null || query.trim().length() < 2) {
            return new DictionaryGrammarSearchResponse(Collections.emptyList(), 0);
        }

        var pageable = PageRequest.of(0, Math.min(limit, 50));
        List<GrammarNote> notes = grammarNoteRepository
                .findByTitleContainingIgnoreCaseOrderByTitleAsc(query.trim(), pageable);

        var results = notes.stream()
                .map(this::toGrammarResult)
                .toList();

        return new DictionaryGrammarSearchResponse(results, results.size());
    }

    // ======================== Mappers ========================

    private DictionaryWordResult toWordResult(VocabItem item) {
        return new DictionaryWordResult(
                item.getId(),
                item.getWord(),
                item.getPronunciation(),
                item.getMeaning(),
                item.getVietnameseMeaning(),
                item.getPartOfSpeech() != null ? item.getPartOfSpeech().name() : null,
                item.getTopic() != null && item.getTopic().getLevel() != null
                        ? item.getTopic().getLevel().name() : null,
                item.getExampleSentence(),
                item.getExampleTranslation()
        );
    }

    private DictionaryGrammarResult toGrammarResult(GrammarNote note) {
        return new DictionaryGrammarResult(
                note.getId(),
                note.getTitle(),
                note.getExplanation(),
                note.getExamples(),
                note.getTopic() != null && note.getTopic().getLevel() != null
                        ? note.getTopic().getLevel().name() : null,
                note.getTopic() != null ? note.getTopic().getCategory() : null
        );
    }
}
