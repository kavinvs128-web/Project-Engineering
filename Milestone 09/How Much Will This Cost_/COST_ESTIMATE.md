# NoteAI — AI Cost Estimate

## Token Usage (5 Test Calls)

Run 5 test calls using the notes in the test/ folder. Copy the [AI_USAGE] log 
line from your terminal after each call. Fill in every cell below.

| Call | Note (words) | Prompt Tokens | Completion Tokens | Total Tokens |
|---|---|---|---|---|
| 1 | ~200 (short-note.txt) | [FILL IN] | [FILL IN] | [FILL IN] |
| 2 | ~500 (medium-note.txt) | [FILL IN] | [FILL IN] | [FILL IN] |
| 3 | ~800 (long-note.txt) | [FILL IN] | [FILL IN] | [FILL IN] |
| 4 | Your choice | [FILL IN] | [FILL IN] | [FILL IN] |
| 5 | Your choice | [FILL IN] | [FILL IN] | [FILL IN] |
| **Average** | — | **[FILL IN]** | **[FILL IN]** | **[FILL IN]** |

## Model Pricing (look up at openrouter.ai/models)

| Model | Input $/1M tokens | Output $/1M tokens |
|---|---|---|
| openai/gpt-4o-mini | [FILL IN] | [FILL IN] |
| [your second model] | [FILL IN] | [FILL IN] |

## Cost Projection Table

Show arithmetic. No empty cells.

| Model | Avg Tokens/Req | Cost/Request | Daily (10 users) | Daily (100 users) | Monthly (100 users) |
|---|---|---|---|---|---|
| gpt-4o-mini | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |
| [second model] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

*Assumes 5 AI calls per user per day.*
*Formula: cost/req = (avg_prompt × input_$/1M) + (avg_completion × output_$/1M)*
*Daily = cost/req × users × 5 calls*
*Monthly = daily × 30*

## Model Recommendation

[Sentence 1: Name the model. State the monthly cost at 100 users as a specific dollar figure.]
[Sentence 2: Explain the quality trade-off — what do you gain or lose vs the most expensive option?]

## Token Plausibility Verification

Model tested: openai/gpt-4o-mini
Note used: [which test note]
Note word count: approximately [X] words
Tokenizer result (from platform.openai.com/tokenizer): [X] tokens for the note alone
System prompt tokens (estimate): approximately [X] tokens
Expected total prompt tokens: approximately [X]
Logged promptTokens from [AI_USAGE]: [X]
Difference explanation: [explain any gap]
