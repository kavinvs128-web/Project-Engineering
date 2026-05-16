# Performance Optimization Report: TxnTracker

## 1. Baseline Performance
- **Interaction**: Typing "a" in search filter
- **Render Time**: [Record time from Profiler] ms
- **Observations**: What is causing the lag? Which components are re-rendering?

---

## 2. Phase 1: Memoization
- **Optimization**: Wrap `TransactionRow` in `React.memo()`.
- **Render Time**: [Record time] ms
- **Improvement**: [Percentage] %
- **Observations**: Did it work as expected? Why or why not?

---

## 3. Phase 2: Stable References
- **Optimization**: Use `useCallback` for the `onSelect` handler in `Transactions.jsx`.
- **Render Time**: [Record time] ms
- **Improvement**: [Percentage] %
- **Observations**: Why was the previous memoization update ineffective without this change?

---

## 4. Phase 3: Computed State
- **Optimization**: Use `useMemo` for `filteredTransactions` in `useTransactions.js`.
- **Render Time**: [Record time] ms
- **Improvement**: [Percentage] %
- **Observations**: How does this impact the hook's performance during filter changes?

---

## 5. Phase 4: Virtualization
- **Optimization**: Implement `react-window` or `react-virtuoso` in `TransactionList.jsx`.
- **Render Time**: [Record time] ms
- **Improvement**: [Percentage] %
- **Observations**: Compare the total DOM node count before and after this change.

---

## Final Summary
[Briefly summarize the cumulative performance gain and the technical trade-offs of these optimizations.]
