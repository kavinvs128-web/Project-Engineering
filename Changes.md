# Changes

## Components created

- `src/components/shared/StatCard.jsx`
- `src/components/shared/TaskItem.jsx`
- `src/components/dashboard/DashboardHeader.jsx`
- `src/components/dashboard/StatsRow.jsx`
- `src/components/dashboard/AddTaskInput.jsx`
- `src/components/dashboard/TaskFilterBar.jsx`
- `src/components/dashboard/TaskList.jsx`

## Responsibility of each component

- `DashboardHeader.jsx`: renders the dashboard title, branding, and greeting section.
- `StatsRow.jsx`: maps through a stats array and renders each statistic using `StatCard`.
- `AddTaskInput.jsx`: renders the add-task input field and add button while delegating state ownership to the parent.
- `TaskFilterBar.jsx`: renders the filter buttons and updates the active filter.
- `TaskList.jsx`: renders the task list and displays the empty state when no tasks match.
- `StatCard.jsx`: renders a generic statistic card with a label, value, and optional footer content.
- `TaskItem.jsx`: renders a generic task row with toggle and delete actions.

## Why components were placed in `dashboard/` vs `shared/`

- `shared/` contains generic, reusable presentation components without dashboard-specific logic.
- `dashboard/` contains page-specific composition components that know how to render the dashboard layout and wire dashboard props.

## Props accepted by each component

- `StatCard.jsx`: `label`, `value`, `valueColor`, `children`
- `TaskItem.jsx`: `task`, `onToggle`, `onDelete`
- `DashboardHeader.jsx`: no props
- `StatsRow.jsx`: `stats`
- `AddTaskInput.jsx`: `taskInput`, `setTaskInput`, `onAddTask`
- `TaskFilterBar.jsx`: `filter`, `setFilter`
- `TaskList.jsx`: `tasks`, `onToggle`, `onDelete`

## Architectural improvements made

- Separated large JSX blocks into focused presentational components.
- Isolated reusable UI pieces in `shared/` and dashboard composition logic in `dashboard/`.
- Kept state and handlers in `DashboardPage.jsx` only.
- Reduced duplicate styling and repeated inline JSX in the page file.
- Improved readability by giving each component a single responsibility.

## What would change if the app scaled 10x larger

- More shared components could be reused across pages, reducing duplication.
- Dashboard-specific components could be further split into smaller pieces (e.g. search input, empty state, progress card).
- A design system or style utility module would replace repeated inline styles.
- State management could be extracted to hooks or context for cross-page task handling.
- Component folders would expand into feature domains with clearer boundaries.
