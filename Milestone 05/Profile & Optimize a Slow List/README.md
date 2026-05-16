# TxnTracker Performance Challenge

Welcome to the TxnTracker React Performance Engineering challenge. Your task is to identify and resolve critical performance bottlenecks in this high-volume transaction dashboard.

## Initial Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open the application in your browser.

## The Challenge

The dashboard currently renders 2,000 transaction records. While it looks polished, it is architecturally broken from a performance standpoint. You will notice significant lag when:
- Typing in the search filter.
- Selecting transactions from the list.

## Your Task

1. **Profile**: Use the React DevTools Profiler to record a baseline of the slow interactions.
2. **Optimize**: Systematically apply four optimization techniques (Memoization, Function stability, Computed state caching, and Virtualization).
3. **Report**: Document your findings and improvements in `PERF_REPORT.md`.

Good luck!
