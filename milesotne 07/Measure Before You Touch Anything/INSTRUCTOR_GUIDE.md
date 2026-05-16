# Instructor Guide: Productivity Dashboard Debugging Challenge

This document contains all the intentional bugs, performance bottlenecks, and logic errors built into the challenge. Do not share this with students until they have completed their baseline measurements and attempted the fixes!

## Overview of Bugs

There are approximately 14 deliberate issues spread across the frontend, backend, and database layers.

---

### 1. Frontend Bugs (React)

#### Bug 1: Infinite Loop / Fatal Re-render (Performance)
* **File:** `frontend/src/components/TaskStats.jsx`
* **Symptom:** The browser tab freezes, network tab shows thousands of requests, dashboard is unusable.
* **Root Cause:** The `useEffect` fetching the `/api/tasks` endpoint is completely missing a dependency array, causing it to run on every single render. Since it sets state (`setStats`) inside the callback, it triggers another render... infinitely.
* **Fix:** Add an empty dependency array to the `useEffect`: `useEffect(() => { ... }, []);`

#### Bug 2: Missing Event Default (Logic)
* **File:** `frontend/src/pages/TasksNotesPage.jsx`
* **Symptom:** Adding a new task causes the entire page to immediately refresh, wiping out any local state and making the UI feel extremely slow.
* **Root Cause:** The `handleAddTask` function is triggered by a form submission, but it lacks `e.preventDefault()`.
* **Fix:** Pass the event object `e` and call `e.preventDefault()` at the start of `handleAddTask`.

#### Bug 3: State Mutation ignoring React Immutable Patterns (Logic)
* **File:** `frontend/src/pages/TasksNotesPage.jsx`
* **Symptom:** When a task is added and the page doesn't refresh (after fixing Bug 2), the new task still does not appear in the list visually until a manual refresh.
* **Root Cause:** The state update mutates the existing array reference: `tasks.push(data); setTasks(tasks);`. React relies on reference equality to determine if it should re-render. Since it's the same array in memory, no re-render occurs.
* **Fix:** Use spread syntax to create a new array instance: `setTasks([...tasks, data]);` or use functional update form `setTasks(prev => [...prev, data]);`.

#### Bug 4: Event Handler Binding Mistakes (Logic)
* **File:** `frontend/src/components/TaskItem.jsx`
* **Symptom:** The "Mark Completed" button does absolutely nothing. The "Delete" button either crashes or deletes the wrong object.
* **Root Cause:**
  1. `onClick={() => onToggleStatus}` does not actually execute the function.
  2. `onClick={onDelete}` passes the React synthetic event object to a function expecting an ID.
* **Fix:**
  1. Change to `onClick={() => onToggleStatus(task._id)}`
  2. Change to `onClick={() => onDelete(task._id)}`

#### Bug 5: Incorrect Conditional Rendering (UI)
* **File:** `frontend/src/components/TaskList.jsx`
* **Symptom:** When the task list is completely empty, a literal "0" appears on the screen above the "No tasks available" text.
* **Root Cause:** `tasks.length && <div>...</div>`. In JavaScript, `0 && ...` evaluates to `0`, which React happily renders to the DOM.
* **Fix:** Use a boolean comparison: `tasks.length > 0 && <div>...</div>`.

#### Bug 6: Extreme Synchronous Calculation (Performance)
* **File:** `frontend/src/components/TaskList.jsx`
* **Symptom:** Typing in the "Add Task" input or clicking any button in the app is extremely laggy and janky.
* **Root Cause:** The `simulateHeavyLoad` function runs a loop 20 million times on the main thread during *every* render of `TaskList`. Since `TasksNotesPage` re-renders on every keystroke in the input field, `TaskList` also re-renders.
* **Fix:** Delete the `simulateHeavyLoad` block entirely, or if it were actual necessary logic, wrap it in a `useMemo` hook.

#### Bug 7: Closure / Stale State Issue (Advanced Logic)
* **File:** `frontend/src/pages/TasksNotesPage.jsx` (Advanced Bug)
* **Symptom:** The `setInterval` auto-logger running in the background persistently logs "Current task count is 0" even when there are clearly tasks on screen.
* **Root Cause:** The `useEffect` setting up the interval has an empty dependency array `[]`. This means the closure surrounding the `setInterval` callback permanently captures the initial value of the `tasks` state (which was an empty array `[]`).
* **Fix:** Either add `tasks` to the dependency array (but this requires carefully clearing and resetting the interval so it doesn't leak), OR use a ref to track the latest state `const tasksRef = useRef(tasks);` and read from `tasksRef.current`.

---

### 2. Backend Bugs (Node.js/Express)

#### Bug 8: Missing `await` / Race Condition (Logic)
* **File:** `backend/controllers/taskController.js` (in `createTask`)
* **Symptom:** A task is returned with a 200 status code, but checking the database reveals it sometimes didn't save, or if the database is down, the API still lies and says it succeeded.
* **Root Cause:** `task.save();` is called without `await`. The process continues and sends the response before the DB operation finishes.
* **Fix:** Add `await` -> `await task.save();` and ensure it's inside the `try` block properly.

#### Bug 9: Terrible Error Handling (Logic)
* **File:** `backend/controllers/taskController.js` (in `createTask`)
* **Symptom:** When a task creation naturally fails (e.g. invalid document), the API returns HTTP 200 OK with `{ success: true, message: err.message }`.
* **Root Cause:** The `catch` block explicitly hardcodes a 200 status.
* **Fix:** Change to `res.status(400).json({ success: false, message: err.message });`.

#### Bug 10: Logic Gap / Ghost Update (Logic)
* **File:** `backend/controllers/taskController.js` (in `updateTask`)
* **Symptom:** A request to update a task returns the visually updated task in the Postman response, but if you refresh the page or make a GET request, the task hasn't actually changed.
* **Root Cause:** The document fields are mutated in memory, but `await task.save();` is completely missing.
* **Fix:** Add `await task.save();` before sending the response.

#### Bug 11: HTTP Protocol Violation (Data)
* **File:** `backend/controllers/taskController.js` (in `deleteTask`)
* **Symptom:** Some frontend fetch operations or Postman setups might show a "Parse Error" or "SyntaxError: Unexpected end of JSON input".
* **Root Cause:** The route returns `res.status(204).json({...})`. Status 204 explicitly means "No Content" and sending a body with a 204 violates the HTTP spec, causing some parsers to crash.
* **Fix:** Either change the status to `200` to keep the body, or send `res.status(204).end();` without a body.

#### Bug 12: N+1 Query Problem & Overfetching (Performance)
* **File:** `backend/controllers/taskController.js` (in `getTasks`)
* **Symptom:** The GET `/api/tasks` endpoint takes increasingly longer as the database grows, and the payload size is massive (megabytes).
* **Root Cause:** The controller loops through every single task and executes an `await Note.find({ taskId: task._id })` query individually. If there are 1000 tasks, this triggers 1001 database queries (the N+1 problem). Additionally, it embeds the full notes history for every task in a dashboard that only needs basic stats!
* **Fix:** 
  1. Do not fetch notes on the main task listing endpoint. Create a separate endpoint for a task's details.
  2. If they must be fetched together, use MongoDB `$lookup` (aggregation) or Mongoose `.populate()` (if schema is refactored) to fetch them in 1 or 2 queries total, rather than a loop.

---

### 3. Database Bugs (Mongoose)

#### Bug 13: Loose Schema / Duplicate Prevention (Data)
* **File:** `backend/models/Task.js`
* **Symptom:** Users can rapidly click the submit button and create 10 identical tasks with the exact same title.
* **Root Cause:** The schema for `title` lacks the `unique: true` constraint. The status field also lacks an `enum` constraint, meaning users could hack the API to set `{ status: "banana" }`.
* **Fix:** Add `unique: true` to the title field, and `enum: ['pending', 'completed']` to the status field.

#### Bug 14: Missing Indexing (Performance)
* **File:** `backend/models/Task.js`
* **Symptom:** Queries filtering by `status` become incredibly slow with millions of records.
* **Root Cause:** The `status` field, which is frequently queried/filtered, is not indexed.
* **Fix:** Add `status: { type: String, default: 'pending', index: true }`.

---
*Happy debugging!*
