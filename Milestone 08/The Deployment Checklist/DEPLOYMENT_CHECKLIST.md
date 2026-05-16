# Deployment Checklist

**Application:** LaunchPad
**Platform:** [Render/Railway/Other]
**Live URL:** [Insert Link]
**Checklist completed:** [Date]
**Engineer:** [Your Name]

---

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 01 | Env variables configured on platform | | |
| 02 | Build passes locally | | |
| 03 | Build passes in CI | | |
| 04 | DB migrations executed | | |
| 05 | CORS verified | | |
| 06 | API base URL correct in production | | |
| 07 | Auth flow tested in production | | |
| 08 | Health endpoint responding | | |
| 09 | No secrets in Git | | |
| 10 | .env.example committed | | |
| 11 | Node version pinned | | |
| 12 | Docker image builds locally | | |

---

## Follow-up Tasks
<!-- Add one bullet per FAIL item with the specific fix needed -->
- FAIL 05: CORS origin was development default. Fixed by setting CORS_ORIGIN on platform.
- FAIL 08: Missing endpoint. Fixed by implementing backend/routes/health.js.
- FAIL 11: Backend Node version was unpinned. Fixed by adding "engines" to backend/package.json.

## Skip Justifications
<!-- Add one bullet per SKIP item explaining why it was intentionally omitted -->
- SKIP 12: Dockerization is listed as an optional learning task.
