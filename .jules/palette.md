## 2025-03-17 - Added Missing ARIA Labels on Profile Layout Components
**Learning:** Icon-only buttons in the user layout section (like `UserProfileSidebar` upload button and `ProfileDropdown` trigger) often lack `aria-label`s, which represents a critical accessibility gap for screen readers as they provide no context of the interaction. Using `size="icon"` in standard `Button` components from `shadcn/ui` makes the label implicit visually, but screen readers are left blind without an explicit accessible label.
**Action:** When adding or reviewing layout buttons (especially those containing avatars or upload icons without text), enforce that any button with `size="icon"` must include an explicit `aria-label` describing its action, such as "Upload profile picture" or "Open user profile menu".

## 2025-03-22 - Added Missing ARIA Labels to Flashcard Stack
**Learning:** Flashcard review components rely heavily on icon-only navigation and audio playback buttons (e.g., `ChevronLeft`, `Volume2`). Without `aria-label`s, screen readers announce these buttons purely as "Button", making the flashcard navigation and pronunciation features completely inaccessible to visually impaired users.
**Action:** Consistently verify that learning-focused components (especially those involving audio or quick navigation) have explicit `aria-label`s on their `Button`s, ensuring users understand what each action does without visual cues.

## 2025-03-23 - Add ARIA label to notification dropdown
**Learning:** Found an icon-only button (Notification bell) in the header navigation that had a `title` attribute but no explicit `aria-label`. While `title` can act as a fallback, an explicit `aria-label` is more robust for screen readers. This is a common pattern for utility buttons in navbars.
**Action:** Always verify that utility/icon-only buttons in global navigation elements (navbars, headers) have explicit `aria-label` attributes to ensure they are accessible.
