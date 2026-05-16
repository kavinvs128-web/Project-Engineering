# Performance Optimization Baseline

**STRICT RULE:** No code changes allowed before this baseline document is submitted. Measure first, code later.

## 1. Backend Measurement Table

Use Postman or your Browser's Network tab to measure at least 5 endpoints.

| Endpoint | HTTP Method | Response Time (ms) | Payload Size (KB) | Number of DB Queries (est.) | Notes / Suspicions |
|----------|-------------|--------------------|-------------------|-----------------------------|--------------------|
| `/api/tasks` | GET | | | | |
| `/api/tasks` | POST | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

## 2. Frontend Measurement Table

Use React DevTools Profiler to identify slow components.

| Component Name | Average Render Time (ms) | Re-render Count (during 10s of use) | Notes / Suspicions |
|----------------|--------------------------|-------------------------------------|--------------------|
| `Dashboard` | | | |
| `TaskStats` | | | |
| `TaskList` | | | |
| `TaskItem` | | | |

## 3. Suspect Identification Section

List the top 3 worst-performing areas with a brief justification based on your measurements above. 

1. **Suspect 1:** 
   - *Justification:* 

2. **Suspect 2:** 
   - *Justification:* 

3. **Suspect 3:** 
   - *Justification:* 
