package com.dailyeng.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dailyeng.repository.NotebookItemRepository;
import com.dailyeng.repository.NotebookRepository;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.dailyeng.dto.NotebookDTO;
import com.dailyeng.entity.Notebook;
import com.dailyeng.entity.NotebookItem;
@SuppressWarnings("null") 
@Service
@RequiredArgsConstructor
public class NotebookService {

    private final NotebookRepository notebookRepo;
    private final NotebookItemRepository itemRepo;

    // 1. Lấy danh sách Notebook (Có Cache 5 phút giống Next.js)
    @Cacheable(value = "notebooks", key = "#userId")
    public List<NotebookDTO.NotebookResponse> getNotebooks(String userId) {
        List<Notebook> notebooks = notebookRepo.findAllByUserIdOrderByCreatedAtAsc(userId);
        return notebooks.stream().map(nb -> {
            int count = nb.getItems().size();
            int mastered = (int) nb.getItems().stream().filter(item -> item.getMasteryLevel() >= 80).count();
            return new NotebookDTO.NotebookResponse(
                    nb.getId(), nb.getName(), nb.getType(), nb.getColor(), count, mastered
            );
        }).collect(Collectors.toList());
    }

    // 2. Tạo Notebook mới
    @Transactional
    @CacheEvict(value = "notebooks", key = "#userId")
    public NotebookDTO.NotebookResponse createNotebook(String userId, NotebookDTO.CreateNotebookRequest req) {
        if (notebookRepo.existsByUserIdAndName(userId, req.name())) {
            throw new IllegalArgumentException("Notebook with this name already exists");
        }

        Notebook notebook = new Notebook();
        notebook.setUserId(userId);
        notebook.setName(req.name());
        notebook.setType(req.type());
        notebook.setColor(req.color() != null ? req.color() : "primary");
        
        Notebook saved = notebookRepo.save(notebook);
        return new NotebookDTO.NotebookResponse(saved.getId(), saved.getName(), saved.getType(), saved.getColor(), 0, 0);
    }

    // 3. Xóa Notebook
    @Transactional
    @CacheEvict(value = {"notebooks", "notebookItems"}, key = "#userId", allEntries = true)
    public void deleteNotebook(String userId, String notebookId) {
        Notebook notebook = notebookRepo.findByIdAndUserId(notebookId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Notebook not found"));
        notebookRepo.delete(notebook);
    }

    // 4. Cập nhật Notebook
    @Transactional
    @CacheEvict(value = "notebooks", key = "#userId")
    public void updateNotebook(String userId, String notebookId, NotebookDTO.UpdateNotebookRequest req) {
        Notebook notebook = notebookRepo.findByIdAndUserId(notebookId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Notebook not found"));
        
        if (req.name() != null) notebook.setName(req.name());
        if (req.color() != null) notebook.setColor(req.color());
        
        notebookRepo.save(notebook);
    }

    // 5. Lấy danh sách Items trong Notebook
    @Cacheable(value = "notebookItems", key = "#notebookId + '-' + #userId")
    public List<NotebookDTO.NotebookItemResponse> getNotebookItems(String userId, String notebookId) {
        List<NotebookItem> items = itemRepo.findAllByNotebookIdAndUserIdOrderByCreatedAtDesc(notebookId, userId);
        return items.stream().map(this::mapToItemResponse).collect(Collectors.toList());
    }

    // 6. Tạo Item mới
    @Transactional
    @CacheEvict(value = {"notebooks", "notebookItems"}, allEntries = true)
    public NotebookDTO.NotebookItemResponse createNotebookItem(String userId, NotebookDTO.CreateItemRequest req) {
        NotebookItem item = new NotebookItem();
        item.setUserId(userId);
        item.setNotebookId(req.notebookId());
        item.setWord(req.word());
        // ... Set các field khác từ req tương tự Prisma data
        item.setMasteryLevel(0);
        item.setNextReview(LocalDateTime.now());
        
        NotebookItem saved = itemRepo.save(item);
        return mapToItemResponse(saved);
    }

    // 7. Xóa Item
    @Transactional
    @CacheEvict(value = {"notebooks", "notebookItems"}, allEntries = true)
    public void deleteNotebookItem(String userId, String itemId) {
        NotebookItem item = itemRepo.findByIdAndUserId(itemId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));
        itemRepo.delete(item);
    }

    // 8. Cập nhật Mastery Level
    @Transactional
    @CacheEvict(value = {"notebooks", "notebookItems"}, allEntries = true)
    public void updateNotebookItemMastery(String userId, String itemId, int masteryLevel) {
        NotebookItem item = itemRepo.findByIdAndUserId(itemId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));
        
        int safeMastery = Math.max(0, Math.min(100, masteryLevel));
        item.setMasteryLevel(safeMastery);
        item.setLastReviewed(LocalDateTime.now());
        
        itemRepo.save(item);
    }

    // Hàm phụ trợ map Entity sang DTO
    private NotebookDTO.NotebookItemResponse mapToItemResponse(NotebookItem item) {
        return new NotebookDTO.NotebookItemResponse(
                item.getId(), item.getWord(), item.getPronunciation(), item.getMeaning(),
                item.getVietnamese(), item.getExamples(), item.getPartOfSpeech(),
                item.getLevel(), item.getNote(), item.getTags(), item.getNotebookId(),
                item.getMasteryLevel(), 
                item.getLastReviewed() != null ? item.getLastReviewed().toString() : null,
                item.getNextReview() != null ? item.getNextReview().toString() : null
        );
    }
}