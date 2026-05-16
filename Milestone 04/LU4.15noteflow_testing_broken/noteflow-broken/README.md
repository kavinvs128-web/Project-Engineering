# NoteFlow API — Testing Challenge (Broken Starter)

**NoteFlow** is a simple note-taking API with two endpoints. This repo contains a **deliberately broken test suite** and a **broken endpoint**. Your job is to find all the flaws, fix them, and make all tests pass.

---

## The Flaws

There are **six things broken** across three files. Find them, fix them.

| File | What's broken |
|---|---|
| `jest.config.js` | Wrong test environment — tests cannot run at all |
| `__tests__/notes.test.js` | 4 broken tests — wrong status codes, wrong response paths, missing mocks, missing mock resets |
| `src/routes/notes.js` | Missing validation + wrong response shape on 404 |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run the tests (observe the failures first)

```bash
npm test
```

You should see multiple test failures. **Read the error messages carefully** — they tell you exactly what each test expected vs. what it received.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/notes` | Create a new note |
| `GET` | `/api/notes/:id` | Get a note by ID |
| `GET` | `/health` | Health check |

### Create a note — request body

```json
{
  "title": "My Note Title",
  "content": "Optional content here"
}
```

### Expected responses

| Scenario | Status | Body |
|---|---|---|
| Note created successfully | `201` | `{ note: { id, title, content, createdAt, updatedAt } }` |
| Note found | `200` | `{ note: { id, title, content, createdAt, updatedAt } }` |
| Note not found | `404` | `{ message: 'Note not found' }` |
| Missing or empty title | `422` | `{ message: '...' }` |

---

## Your Tasks

1. **Run the tests** — observe which tests fail and read the error messages
2. **Fix `jest.config.js`** — one line change
3. **Fix `__tests__/notes.test.js`** — four test flaws to find and correct
4. **Fix `src/routes/notes.js`** — add validation and fix the 404 response shape
5. **Run `npm test` again** — all 5 tests should pass
6. **Push to your own repo and create a PR** from branch `fix/api-tests` to `main`

---

## Understanding the Mock Setup

This test suite uses `jest.mock('@prisma/client')` to replace real database calls with mock functions. This means:

- Tests run without a real database
- `prisma.note.create` and `prisma.note.findUnique` return whatever you tell them to with `mockResolvedValue()`
- If you don't set a return value for a mock, it returns `undefined` by default — which causes unexpected behaviour

---

## Submission

- **GitHub PR link** (from `fix/api-tests` branch to `main`)
- **Video explanation** (3–5 minutes): walk through the flaws you found, explain why each one broke the test, show `npm test` passing at the end
