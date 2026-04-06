## 2024-03-26 - Added aria-label to Edit icon in PlanPageClient.tsx
**Learning:** Found an `aria-label` missing on a `Button` component that only contained an icon (`<Edit2 className="w-3 h-3" />`).
**Action:** Always make sure `size="icon"` buttons have an `aria-label`.
## 2026-03-28 - Added dynamic aria-label to star button in VocabularyFlashcards.tsx
**Learning:** Stateful icon-only buttons (like a toggleable Star icon) not only need an `aria-label`, but the label needs to dynamically reflect the action that will happen when clicked (e.g., 'Star flashcard' vs 'Unstar flashcard').
**Action:** Always check if icon-only buttons are stateful, and ensure their `aria-label` provides the correct context for the current state.

## $(date +%Y-%m-%d) - Add accessible labels to microphone buttons in practice mode
**Learning:** Found that custom practice mode components (`GrammarPracticeMode.tsx` and `VocabPracticeMode.tsx`) used interactive `Button` elements with `size="icon"` for microphone recording but lacked `aria-label`s, rendering them inaccessible to screen readers.
**Action:** Always ensure that icon-only interactive buttons in newly created or complex interactive modes have both an `aria-label` for screen reader support and a `title` for visual tooltips.

## 2026-04-05 - Add accessible labels to microphone buttons in practice mode
**Learning:** Found that custom practice mode components (`GrammarPracticeMode.tsx` and `VocabPracticeMode.tsx`) used interactive `Button` elements with `size="icon"` for microphone recording but lacked `aria-label`s, rendering them inaccessible to screen readers.
**Action:** Always ensure that icon-only interactive buttons in newly created or complex interactive modes have both an `aria-label` for screen reader support and a `title` for visual tooltips.
