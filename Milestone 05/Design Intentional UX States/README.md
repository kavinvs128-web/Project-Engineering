# Assignment  — Design Intentional UX States

## Your Mission

You've joined the frontend team at **Orderly**, a B2B order management platform. The Orders Dashboard fetches data from an API — but right now it just shows a blank screen or raw JSON while doing so.

**Users have no idea what's happening.** Your job is to fix that by implementing four intentional UX states that every async feature must handle.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — you'll see the Orders Dashboard.


## The Four States You Must Implement

Open `src/components/OrdersDashboard.jsx` and find the `TODO` block inside the `<tbody>` tag.

Replace the placeholder with proper conditional rendering for all four states:

### Loading State
**When:** Data is being fetched  
**What to show:** Animated skeleton rows — so the user sees the *shape* of the content before it arrives  

### Success State
**When:** Data loaded and orders exist  
**What to show:** The full orders table with real data  

### Empty State
**When:** Data loaded but the array is empty  
**What to show:** A helpful, friendly message — not a blank table    
**Make it good:** Add a real icon, a clear heading, an explanatory message, and a CTA button

### Error State
**When:** The API call failed  
**What to show:** The error message and a Retry button  
**Make it good:** Show the real error message, style the error card, ensure Retry works


## Testing Each State

Open `src/mockApi.js` and change the `SIMULATE` constant:

```js
export const SIMULATE = 'success'  // ← change this
```

| Value | What happens |
|-------|-------------|
| `'loading'` | API never responds — tests your ① loading state |
| `'success'` | Returns 8 orders — tests your ② success state |
| `'empty'`   | Returns 0 orders — tests your ③ empty state |
| `'error'`   | Throws an error — tests your ④ error state |


## What to Submit

1. **Your completed `OrdersDashboard.jsx`** — all 4 states implemented
2. **GitHub Pull Request** with your changes
3. **Video walkthrough** 

## Hint

- The `loading`, `error`, and `orders` variables are already wired up in state — you just need to use them

Good luck!
