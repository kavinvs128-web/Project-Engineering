# Task Manager App Specification

This is the exact same feature set you must implement in both your vibe version and your pair version. Do not add extra features. Do not remove features. The comparison is only valid if both apps do the same thing.

## Feature List

1. **Add a task** — The user types a task title in an input field and clicks an "Add" button or presses the Enter key. The new task should then appear in the list.
2. **Mark complete** — The user clicks on a task to toggle it between an active and completed state. Completed tasks must be visually distinct (e.g., using a strikethrough or a muted color).
3. **Filter** — There should be three filter buttons: All, Active, and Completed. Clicking a filter should display only the tasks that match that specific status.
4. **Task count** — A line below the list showing "X tasks remaining" that updates dynamically as tasks are completed or added.

## What the UI Should Look Like

The UI should be clean and functional. It should include:
- A header with the app title.
- An input area with an "Add" button.
- The task list displayed below the input.
- Filter buttons positioned either above or below the list.
- The task count displayed at the very bottom.

The app does not need to be complex or styled elaborately — it primarily needs to work correctly and follow the layout described.

## What Does NOT Need to Be Built

- **Persistence**: Tasks can reset on page refresh.
- **Authentication**: No login or user accounts required.
- **Backend**: No database or API integration needed.
- **Routing**: This is a single-page application; no multiple pages or routes are necessary.

## Your Evaluation Goal

Remember that you are not trying to build the best or most feature-rich app. Your goal is to build the exact same app twice so you can observe and compare how the two different AI approaches (Vibe vs. Pair) differ in their workflows, efficiency, and output.
