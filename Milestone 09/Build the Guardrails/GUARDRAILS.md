# JobScan AI — Production Guardrails

## Phase 1: Failures Observed

### Failure 1 — Unlimited Input Length
Observed: [describe what happened when you submitted 5000 chars]
AI service called: [YES — token log appeared in terminal]

### Failure 2 — Indefinite Hang
Observed: [describe what happened with artificial delay]
Duration: [X seconds before timeout or manual cancel]

### Failure 3 — Server Crash on LLM Error
Observed: [paste the TypeError message from terminal]
Server state after crash: [describe — could it respond to /health?]

---

## Guardrail 1 — Input Length Validation

**What was added:** [TO BE COMPLETED]
**What it protects against:** [TO BE COMPLETED]
**Production incident it prevents:** [TO BE COMPLETED — one sentence]

---

## Guardrail 2 — Request Timeout

**What was added:** [TO BE COMPLETED]
**What it protects against:** [TO BE COMPLETED]
**Production incident it prevents:** [TO BE COMPLETED — one sentence]

---

## Guardrail 3 — LLM Failure Handling

**What was added:** [TO BE COMPLETED]
**What it protects against:** [TO BE COMPLETED]
**Production incident it prevents:** [TO BE COMPLETED — one sentence]
