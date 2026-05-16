# Assignment - Build a Resilient API Service Layer

## Your Mission

You've just joined **DevMarket** — a marketplace for developer tools (APIs, templates, CLI tools, SDKs, and plugins). The previous dev left behind a **total mess**. Every component is doing its own API calls with hardcoded URLs, different patterns, no interceptors, and zero consistency.

Your job: **Fix it like a pro.**

## The Problems (Find them all)

1. **Hardcoded URLs** — `https://fakestoreapi.com` appears **6+ times** across the codebase
2. **No auth token management** — `localStorage.getItem('auth_token')` is copy-pasted in every component  
3. **Inconsistent patterns** — Some files use `.then()`, others use `async/await`, some mix both
4. **No global error handling** — 401s, 500s, and network errors are handled differently everywhere (or ignored!)
5. **No interceptors** — Every request manually sets headers; every response manually checks status codes
6. **Components doing too much** — UI components are cluttered with data-fetching logic


## Your Tasks

### Step 1 — Audit
Count every `fetch(` call in the codebase. Where are they? What endpoints? What patterns?

### Step 2 — Create the Service Layer
Create `src/services/api.js` with:
- An **axios instance** configured with `baseURL` from `.env`
- A **request interceptor** that attaches the auth token automatically
- A **response interceptor** that handles 401s and 500s globally
- Clean, named functions: `getProducts()`, `getProduct(id)`, `getCategories()`, `addToCart(data)`, `getCart(userId)`, `deleteCartItem(id)`, `getUser(id)`, `updateUser(id, data)`

### Step 3 — Refactor Components
Replace every raw `fetch()` call with your new service functions. Components should:
- Only manage **UI state** (loading, error, data)
- Import and call functions from `api.js`
- Never touch `localStorage`, headers, or base URLs directly

### Step 4 — Test & Submit
Verify all pages work, then submit a PR with a short walkthrough video explaining your changes.


## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

```
VITE_API_BASE_URL=https://fakestoreapi.com
```

## Tips from Your Tech Lead

> "A good API service layer means if the base URL changes tomorrow, you change it in ONE place — `.env` — and the whole app updates. That's the goal."

> "Interceptors are your superpower. Set it once, forget it forever. No more copy-pasting headers."

> "Your components should be embarrassingly simple. If a component knows what `Authorization` means, something's wrong."
