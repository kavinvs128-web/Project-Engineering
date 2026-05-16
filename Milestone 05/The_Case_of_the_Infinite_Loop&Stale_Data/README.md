# ShopWave Dashboard — Debugging Assignment

##  Context

You've just joined **ShopWave**, a fast-growing e-commerce startup, as a junior engineer on the **Platform Team**.

It's 10 AM on your second week. You get this message from your tech lead:

> **Priya Sharma (Tech Lead) — 10:04 AM**
>
> "Hey! Sorry to throw you in the deep end but we have a live incident 🚨
>
> The **Product Search** page is completely broken. I mean *thousands* of API requests per second — the browser tab is freezing. Support is getting flooded with complaints.
>
> Also, the **Order Manager** has a silent bug — our agents keep changing order statuses but the badge on the screen never updates, so they keep clicking over and over thinking it didn't save.
>
> Demo with investors is at **3 PM**. I've pushed the broken branch — can you debug and fix both pages? Please document what you find so we can add it to our internal debugging wiki.
>
> Good luck — Priya"


## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

> **Before you navigate anywhere:** open **DevTools → Console** and **DevTools → Network** tabs. Keep them open the whole time.

## App Structure

```
src/
├── api/
│   └── shopwaveApi.js       # Mock API — do NOT modify
├── pages/
│   ├── Dashboard.jsx        # ✅ Working — start here to understand the app
│   ├── ProductSearch.jsx    # ❌ BUGGY — Bug #1 and Bug #2
│   └── OrderManager.jsx     # ❌ BUGGY — Bug #3
├── App.jsx                  # Routing + layout
└── App.css                  # Styles
```

| Page | Route | Status |
|------|-------|--------|
| Dashboard | `/` | ✅ No bugs |
| **Product Search** | `/products` | 🔴 **2 bugs** |
| **Order Manager** | `/orders` | 🔴 **1 bug** |

## Bug Summary (what you need to find)

| # | Page | Symptom |
|---|------|---------|
| 1 | Product Search | Browser freezes, infinite spinner, thousands of API calls per second |
| 2 | Product Search | Typing quickly shows stale results from an earlier query |
| 3 | Order Manager | Changing an order's status via the dropdown never updates the coloured badge |

## Your Tasks

1. **Reproduce** each bug by navigating to the broken pages
2. **Observe** the behaviour — note exactly what is wrong
3. **Investigate** the source code in `src/pages/`
4. **Use DevTools** — Console, Network tab, React DevTools
5. **Identify** the exact lines causing each issue
6. **Create** a `BUG_REPORT.md` file documenting each bug (see format below)
7. **Fix** the bugs in the source files
8. **Verify** everything works correctly and no new issues appear
9. **Submit** a GitHub PR with your fixed code + `BUG_REPORT.md` + a short walkthrough video

## BUG_REPORT.md Format

Create a `BUG_REPORT.md` in the project root. For each bug, include:

```markdown
## Bug #N — [Short Title]

**File:** `src/pages/XYZ.jsx`
**Line(s):** 42–47

### Expected Behaviour
What should happen?

### Actual Behaviour
What actually happens? (Be specific)

### Root Cause
The precise technical reason (e.g. which React rule is being violated and why)

### Fix Applied
What did you change and why?

## Hints (only peek if you're stuck!)

#### Hint — Product Search Bug #1

Open the browser Console and watch it while you type one character.
Then look at the `useEffect` dependency array in `ProductSearch.jsx`.
Ask yourself: is every value in that array something that *should* cause the effect to re-run?
What happens when a value that is *set inside the effect* is also listed as a dependency?

#### Hint — Product Search Bug #2

Open the **Network** tab and type `"head"` then quickly continue typing `"headphones"`.
How many requests fired? Which one resolved last?
Look up "debouncing" and "useEffect cleanup functions" in the React docs.

#### Hint — Order Manager Bug #3

Change an order's status. The API call succeeds (check Network). But the badge doesn't change.
Find `handleStatusChange` in `OrderManager.jsx` and trace exactly what is passed to `setOrders`.
Ask yourself: does React re-render when `setOrders` receives the **same array reference** as before?
