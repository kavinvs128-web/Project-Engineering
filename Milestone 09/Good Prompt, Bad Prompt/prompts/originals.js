// prompts/originals.js

// Task A — Notes Reviewer
// Used by: GET /api/notes/:id/review
// Expected by UI: { clarity: { score, feedback }, completeness: { score, feedback }, accuracy: { score, feedback }, overallScore, topPriority }
export const TASK_A_PROMPT = (content) => ({
  systemMsg: '',  // intentionally empty — no system instruction
  userMsg: `give feedback on this note: ${content}`
})

// Task B — Placement Summariser
// Used by: GET /api/interviews/:id/summary
// Expected by UI: { company, role, difficulty: number, keyTopics: string[], outcome }
export const TASK_B_PROMPT = (text) => ({
  systemMsg: '',  // intentionally empty
  userMsg: `summarize this interview experience: ${text}`
})

// Task C — Error Analyst
// Used by: POST /api/errors/analyse
// Expected by dashboard: { rootCause, affectedComponent, severity: 'low'|'medium'|'high'|'critical', recommendedFix, codeSnippet? }
export const TASK_C_PROMPT = (error_message) => ({
  systemMsg: '',  // intentionally empty
  userMsg: `why is there a bug: ${error_message}`
})
