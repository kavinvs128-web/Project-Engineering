# AI Feature Cost Estimate

## Feature
Name: [Your feature name]
Problem solved: [one sentence]

## Token Usage (from 5 real calls in production Render logs)

| Call | Prompt Tokens | Completion Tokens | Total Tokens |
|---|---|---|---|
| 1 | [FILL FROM RENDER LOGS] | [FILL] | [FILL] |
| 2 | [FILL] | [FILL] | [FILL] |
| 3 | [FILL] | [FILL] | [FILL] |
| 4 | [FILL] | [FILL] | [FILL] |
| 5 | [FILL] | [FILL] | [FILL] |
| **Average** | **[FILL]** | **[FILL]** | **[FILL]** |

## Model Pricing
Model: [exact model name from openrouter.ai/models]
Input: $[X] per 1M tokens
Output: $[Y] per 1M tokens

## Cost Per Request
([avg_prompt] × $[X]/1,000,000) + ([avg_completion] × $[Y]/1,000,000) = $[Z]

## Monthly Projection
Assumption: 100 users × 5 calls/day × 30 days = 15,000 requests/month
Monthly cost: 15,000 × $[Z] = $[TOTAL]/month

## Rate Limit Cost Check
[N] requests/hr × $[Z]/request = $[max] max per user per hour
