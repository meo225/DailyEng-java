## 2026-03-17 - Hooks placement in React Components
**Learning:** React Hooks (`useMemo`, `useState`, etc.) must always be called at the top level of the component before any early returns. Calling them conditionally or after an early return violates the Rules of Hooks and causes a crash.
**Action:** When refactoring to add hooks like `useMemo`, ensure they are placed above early returns, even if the data they compute is only used in a specific conditional branch.
