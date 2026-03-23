package com.dailyeng.service;

import com.dailyeng.entity.GrammarNote;
import com.dailyeng.entity.VocabItem;
import com.dailyeng.entity.enums.PartOfSpeech;
import com.dailyeng.repository.GrammarNoteRepository;
import com.dailyeng.repository.VocabItemRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

/**
 * Unit tests for {@link DictionaryService}.
 */
@ExtendWith(MockitoExtension.class)
class DictionaryServiceTest {

    @Mock private VocabItemRepository vocabItemRepo;
    @Mock private GrammarNoteRepository grammarNoteRepo;

    @InjectMocks private DictionaryService dictionaryService;

    // ========================================================================
    // searchWords
    // ========================================================================

    @Nested
    @DisplayName("searchWords")
    class SearchWords {

        @Test
        @DisplayName("returns matching vocabulary words")
        void returnsResults() {
            var item = VocabItem.builder()
                    .word("accomplish")
                    .pronunciation("/əˈkʌmplɪʃ/")
                    .meaning("To complete successfully")
                    .vietnameseMeaning("Hoàn thành")
                    .partOfSpeech(PartOfSpeech.verb)
                    .exampleSentence("She accomplished her goals.")
                    .exampleTranslation("Cô ấy đã hoàn thành mục tiêu.")
                    .build();
            item.setId("item-1");

            when(vocabItemRepo.findByWordContainingIgnoreCaseOrderByWordAsc(eq("accom"), any()))
                    .thenReturn(List.of(item));

            var response = dictionaryService.searchWords("accom", 10);

            assertEquals(1, response.total());
            assertEquals("accomplish", response.results().get(0).word());
            assertEquals("To complete successfully", response.results().get(0).meaning());
            assertEquals("Hoàn thành", response.results().get(0).vietnameseMeaning());
            assertEquals("verb", response.results().get(0).partOfSpeech());
        }

        @Test
        @DisplayName("returns empty for short query")
        void emptyForShortQuery() {
            var response = dictionaryService.searchWords("a", 10);
            assertEquals(0, response.total());
            assertTrue(response.results().isEmpty());
        }

        @Test
        @DisplayName("returns empty for null query")
        void emptyForNull() {
            var response = dictionaryService.searchWords(null, 10);
            assertEquals(0, response.total());
            assertTrue(response.results().isEmpty());
        }

        @Test
        @DisplayName("respects limit cap of 50")
        void limitCapped() {
            when(vocabItemRepo.findByWordContainingIgnoreCaseOrderByWordAsc(eq("test"), any()))
                    .thenReturn(List.of());

            // Should not throw, even with limit > 50
            var response = dictionaryService.searchWords("test", 100);
            assertNotNull(response);
        }
    }

    // ========================================================================
    // searchGrammar
    // ========================================================================

    @Nested
    @DisplayName("searchGrammar")
    class SearchGrammar {

        @Test
        @DisplayName("returns matching grammar rules")
        void returnsResults() {
            var note = GrammarNote.builder()
                    .topicId("topic-1")
                    .title("Present Perfect Tense")
                    .explanation("Used for actions completed at an unspecified time.")
                    .examples(List.of())
                    .build();
            note.setId("note-1");

            when(grammarNoteRepo.findByTitleContainingIgnoreCaseOrderByTitleAsc(eq("perfect"), any()))
                    .thenReturn(List.of(note));

            var response = dictionaryService.searchGrammar("perfect", 10);

            assertEquals(1, response.total());
            assertEquals("Present Perfect Tense", response.results().get(0).title());
            assertEquals("Used for actions completed at an unspecified time.",
                    response.results().get(0).explanation());
        }

        @Test
        @DisplayName("returns empty for short query")
        void emptyForShortQuery() {
            var response = dictionaryService.searchGrammar("p", 10);
            assertEquals(0, response.total());
            assertTrue(response.results().isEmpty());
        }

        @Test
        @DisplayName("returns empty for empty string query")
        void emptyForBlank() {
            var response = dictionaryService.searchGrammar("  ", 10);
            assertEquals(0, response.total());
        }
    }
}
