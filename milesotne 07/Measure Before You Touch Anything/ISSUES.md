# Known Issues in the System

The QA team has reported several critical bugs and performance issues. Your task is to track down the root cause for each of these symptoms.

## Feature / Logic Bugs
1. **Tasks sometimes don't visually update after adding.** You have to refresh the page to see the newly added task reliably, or the UI just swallows it.
2. **The "Add Task" button reloads the entire page.** 
3. **The "Delete" button does not work correctly.** It either crashes or fails silently.
4. **The "Mark Completed" button sometimes doesn't trigger anything at all.**
5. **Dashboard stats frequently crash the application or cause the browser to freeze/lag horribly.**
6. **Sometimes when there are no tasks, a mysterious "0" appears on the screen instead of a friendly empty state message.**
7. **The auto-save logging for background sync always thinks there are 0 tasks, even when tasks are clearly visible on screen.**

## Server / DB Bugs
8. **Some endpoints seem to return massive amounts of unrelated data.** 
9. **Duplicate tasks appear if you submit quickly.**
10. **The API sometimes mysteriously reports a success status code (200), even when it actually failed to save.**

## Performance Complaints
- **The Dashboard loads incredibly slowly.**
- **The Task List UI freezes whenever there is an update.** 

Good luck hunting these down! Use `BASELINE.md` first.
