## 2024-06-12 - [Optimized O(n*m) to O(n) in study-heatmap.tsx]
**Learning:** React component derived state generation involving nested loops across arrays can cause unnecessary O(N^2) or worse complexities on each render. In `src/components/profile/study-heatmap.tsx`, finding existing heatmap entries within a date generation loop resulted in an O(365 * data.length) operation.
**Action:** Replace `Array.prototype.find()` inside loops with O(1) hash map lookups (`Map`) when deriving state from lists, especially when the loop has a constant large factor (like 365 days).
