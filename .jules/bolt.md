## 2024-06-12 - [Optimized O(n*m) to O(n) in study-heatmap.tsx]
**Learning:** React component derived state generation involving nested loops across arrays can cause unnecessary O(N^2) or worse complexities on each render. In `src/components/profile/study-heatmap.tsx`, finding existing heatmap entries within a date generation loop resulted in an O(365 * data.length) operation.
**Action:** Replace `Array.prototype.find()` inside loops with O(1) hash map lookups (`Map`) when deriving state from lists, especially when the loop has a constant large factor (like 365 days).

## 2025-02-14 - [Fixed App-Wide Re-renders caused by Zustand in useTranslation]
**Learning:** Destructuring directly from a Zustand store (`const { language } = useAppStore()`) without a selector subscribes the calling component to the *entire* store. In widely used hooks like `useTranslation` (used in hundreds of components), this causes massive cascading re-renders across the entire app whenever *any* unrelated state in the store (e.g., XP, streak, doraraOpen) changes.
**Action:** Always use precise selectors (`useAppStore((state) => state.language)`) when consuming Zustand state in hooks or components to prevent unnecessary React renders, especially for broadly utilized utility hooks.
