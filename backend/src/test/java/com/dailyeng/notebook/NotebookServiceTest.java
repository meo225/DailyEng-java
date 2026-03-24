package com.dailyeng.notebook;

import com.dailyeng.notebook.NotebookDtos.*;
import com.dailyeng.common.exception.BadRequestException;
import com.dailyeng.common.exception.ResourceNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link NotebookService}.
 */
@ExtendWith(MockitoExtension.class)
class NotebookServiceTest {

    @Mock private NotebookRepository notebookRepo;
    @Mock private NotebookItemRepository itemRepo;

    @InjectMocks private NotebookService notebookService;

    private static final String USER_ID = "user-123";
    private static final String NOTEBOOK_ID = "nb-456";
    private static final String ITEM_ID = "item-789";

    private Notebook createTestNotebook(String name) {
        var nb = Notebook.builder()
                .userId(USER_ID).name(name).type("vocabulary").color("blue")
                .items(new ArrayList<>()).build();
        nb.setId(NOTEBOOK_ID);
        return nb;
    }

    private NotebookItem createTestItem(String word) {
        var item = NotebookItem.builder()
                .userId(USER_ID).notebookId(NOTEBOOK_ID).word(word)
                .masteryLevel(50).isStarred(false)
                .meaning(List.of("meaning")).vietnamese(List.of("vietnamese"))
                .tags(List.of("tag1"))
                .createdAt(LocalDateTime.now()).build();
        item.setId(ITEM_ID);
        return item;
    }

    // ========================================================================
    // Notebook CRUD
    // ========================================================================

    @Nested
    @DisplayName("createNotebook")
    class CreateNotebook {

        @Test
        @DisplayName("creates notebook successfully")
        void success() {
            when(notebookRepo.existsByUserIdAndNameAndLanguage(USER_ID, "English", "en")).thenReturn(false);
            when(notebookRepo.save(any())).thenAnswer(inv -> {
                Notebook nb = inv.getArgument(0);
                nb.setId(NOTEBOOK_ID);
                return nb;
            });

            var req = new CreateNotebookRequest("English", "vocabulary", "blue");
            var result = notebookService.createNotebook(USER_ID, "en", req);

            assertEquals("English", result.name());
            assertEquals("vocabulary", result.type());
            assertEquals("blue", result.color());
            verify(notebookRepo).save(any());
        }

        @Test
        @DisplayName("uses default color when not provided")
        void defaultColor() {
            when(notebookRepo.existsByUserIdAndNameAndLanguage(USER_ID, "Test", "en")).thenReturn(false);
            when(notebookRepo.save(any())).thenAnswer(inv -> {
                Notebook nb = inv.getArgument(0);
                nb.setId(NOTEBOOK_ID);
                return nb;
            });

            var req = new CreateNotebookRequest("Test", "type", null);
            var result = notebookService.createNotebook(USER_ID, "en", req);

            assertEquals("primary", result.color());
        }

        @Test
        @DisplayName("throws BadRequestException for duplicate name")
        void duplicateName() {
            when(notebookRepo.existsByUserIdAndNameAndLanguage(USER_ID, "English", "en")).thenReturn(true);

            var req = new CreateNotebookRequest("English", "vocabulary", "blue");
            assertThrows(BadRequestException.class,
                    () -> notebookService.createNotebook(USER_ID, "en", req));
        }
    }

    @Test
    @DisplayName("deleteNotebook removes notebook")
    void deleteNotebook() {
        var nb = createTestNotebook("English");
        when(notebookRepo.findByIdAndUserId(NOTEBOOK_ID, USER_ID)).thenReturn(Optional.of(nb));

        notebookService.deleteNotebook(USER_ID, NOTEBOOK_ID);

        verify(notebookRepo).delete(nb);
    }

    @Test
    @DisplayName("deleteNotebook throws when notebook not found")
    void deleteNotebookNotFound() {
        when(notebookRepo.findByIdAndUserId(NOTEBOOK_ID, USER_ID)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> notebookService.deleteNotebook(USER_ID, NOTEBOOK_ID));
    }

    @Test
    @DisplayName("updateNotebook updates partial fields")
    void updateNotebook() {
        var nb = createTestNotebook("Old Name");
        when(notebookRepo.findByIdAndUserId(NOTEBOOK_ID, USER_ID)).thenReturn(Optional.of(nb));
        when(notebookRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        var req = new UpdateNotebookRequest("New Name", null);
        var result = notebookService.updateNotebook(USER_ID, NOTEBOOK_ID, req);

        assertEquals("New Name", result.name());
    }

    // ========================================================================
    // Mastery & Star
    // ========================================================================

    @Nested
    @DisplayName("updateMastery")
    class UpdateMastery {

        @Test
        @DisplayName("clamps mastery to 0-100 range")
        void clampsMastery() {
            var item = createTestItem("hello");
            when(itemRepo.findByIdAndUserId(ITEM_ID, USER_ID)).thenReturn(Optional.of(item));
            when(itemRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            // Above 100 — should clamp to 100
            var result1 = notebookService.updateMastery(USER_ID, ITEM_ID, 150);
            assertEquals(100, result1.masteryLevel());

            // Below 0 — should clamp to 0
            var result2 = notebookService.updateMastery(USER_ID, ITEM_ID, -10);
            assertEquals(0, result2.masteryLevel());
        }

        @Test
        @DisplayName("updates mastery normally for valid values")
        void validMastery() {
            var item = createTestItem("hello");
            when(itemRepo.findByIdAndUserId(ITEM_ID, USER_ID)).thenReturn(Optional.of(item));
            when(itemRepo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = notebookService.updateMastery(USER_ID, ITEM_ID, 75);
            assertEquals(75, result.masteryLevel());
        }
    }

    @Test
    @DisplayName("toggleStar flips starred state")
    void toggleStar() {
        var item = createTestItem("hello");
        assertFalse(item.isStarred());

        when(itemRepo.findByIdAndUserId(ITEM_ID, USER_ID)).thenReturn(Optional.of(item));
        when(itemRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        var result = notebookService.toggleStar(USER_ID, ITEM_ID);
        assertTrue(result.isStarred());

        // Toggle again
        var result2 = notebookService.toggleStar(USER_ID, ITEM_ID);
        assertFalse(result2.isStarred());
    }

    // ========================================================================
    // getNotebooks
    // ========================================================================

    @Test
    @DisplayName("getNotebooks returns notebook list with mastered counts")
    void getNotebooks() {
        var masteredItem = createTestItem("advanced");
        masteredItem.setMasteryLevel(90); // above threshold 80

        var nb = createTestNotebook("English");
        nb.setItems(List.of(masteredItem));

        when(notebookRepo.findAllByUserIdAndLanguageOrderByCreatedAtAsc(USER_ID, "en")).thenReturn(List.of(nb));

        var result = notebookService.getNotebooks(USER_ID, "en");

        assertEquals(1, result.total());
        assertEquals(1, result.notebooks().get(0).itemCount());
        assertEquals(1, result.notebooks().get(0).masteredCount());
    }
}
