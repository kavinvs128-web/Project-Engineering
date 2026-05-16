# TrackFlow – Bug Report Form (Broken Version)

## Your Mission

You've just joined the QA Engineering team at **TrackFlow Inc.**, a fast-growing SaaS company. Every Monday before sprint planning, the team files bug reports using this internal tool.

Except... the form is broken. Engineers are submitting empty reports, the button gets clicked multiple times, errors disappear into the void, and nobody knows if a submission worked or not. Your tech lead has assigned this to you as your **first ticket**.

> **Ticket #FE-114** -The bug reporter form is itself buggy. Please fix it before Monday's sprint planning.
 

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)


## Your Task

Open `src/App.jsx`. There are **6 bugs** hidden in the code — all marked with `// BUG:` comments to help you locate them.

### The Bugs to Fix

| # | Problem |
|---|---------|
| 1 | Form submits even when required fields are empty |
| 2 | No loading state — button stays active, allowing duplicate submissions |
| 3 | Form is not cleared after a successful submission |
| 4 | Server-side errors are silently swallowed (try a title with "login" in it!) |
| 5 | No per-field validation messages shown to the user |
| 6 | "No. of Steps" accepts `0`, negatives, and empty values |


## How to Test Each Bug

1. **Bug 1** — Hit "Submit Bug Report" without filling anything in. What happens?
2. **Bug 2** — Fill the form and click Submit rapidly multiple times. Does the button disable?
3. **Bug 3** — Submit successfully. Does the form clear?
4. **Bug 4** — Type a title containing the word **"login"** and submit. Does an error appear?
5. **Bug 5** — Leave a required field blank and submit. Are error messages shown next to fields?
6. **Bug 6** — Enter `-5` or `0` in the "No. of Steps" field. Is it rejected?


## Rules

- Fix bugs in `src/App.jsx` only
- Do **not** modify `src/api.js` or `src/index.css`
- You may add new state variables, helper functions, or small components inside `App.jsx`


## Deliverable

Open a GitHub PR with:
- Your fixed `App.jsx`
- A short video recording (~2–3 min) walking through each fixed bug

Good luck — the sprint planning crew is counting on you!
