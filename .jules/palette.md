## 2025-04-02 - Icon-only Button Accessibility
**Learning:** React elements utilizing Shadcn `Button` components with `size="icon"` frequently miss `aria-label`s since they do not have text children. This limits screen reader visibility.
**Action:** When adding or reviewing `size="icon"` buttons, always verify if an `aria-label` or `title` exists so assistive technologies can describe the interactive element.
