# TrackFlow — Performance Baseline

## Schema Analysis
[TO BE COMPLETED — identify which columns are missing indexes]

## Baseline Measurements (Before Indexes)

### Endpoint 1: GET /api/tasks?assignedUserId=:id
- Query: SELECT * FROM "Task" WHERE "assignedUserId" = $1 ORDER BY "createdAt" DESC
- Query Plan (run EXPLAIN ANALYZE and paste here):
  [TO BE COMPLETED]
- Execution Time: [TO BE COMPLETED]
- HTTP Response Time: [TO BE COMPLETED]

### Endpoint 2: GET /api/projects/:id/tasks?status=:status
- Query: SELECT * FROM "Task" WHERE "projectId" = $1 AND "status" = $2
- Query Plan: [TO BE COMPLETED]
- Execution Time: [TO BE COMPLETED]
- HTTP Response Time: [TO BE COMPLETED]

### Endpoint 3: GET /api/tasks/:id/comments
- Query: SELECT * FROM "Comment" WHERE "taskId" = $1 ORDER BY "createdAt" ASC
- Query Plan: [TO BE COMPLETED]
- Execution Time: [TO BE COMPLETED]
- HTTP Response Time: [TO BE COMPLETED]

## After Measurements (Post-Index)
[TO BE COMPLETED after adding indexes]

## Index Decision Rationale
[TO BE COMPLETED — explain why composite indexes were chosen]
