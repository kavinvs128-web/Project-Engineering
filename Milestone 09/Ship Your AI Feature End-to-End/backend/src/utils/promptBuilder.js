// backend/src/utils/promptBuilder.js
// =====================================================================
// CONSTRAINT 2: ALL prompt logic must live in this file.
// Your routes and controllers must NOT contain system instructions,
// message arrays, or prompt templates. Only this file builds prompts.
// =====================================================================

// Replace this with your specific system instruction.
// Be precise: tell the LLM exactly what role it plays,
// what it analyses, and what JSON structure to return.
const SYSTEM_PROMPT = `You are [describe the specific expert role].

[Describe exactly what the LLM should do with the user's input]

Return ONLY a JSON object with exactly these fields:
{
  "field1": "description of this field",
  "field2": ["array", "of", "items"],
  "field3": "high OR medium OR low",
  "confidence": "overall confidence in the analysis"
}
Return ONLY valid JSON. No markdown. No explanation. No other text.`

// Called by aiController — receives the validated user input
// Returns the messages array for the OpenRouter API call
export function buildPrompt(userInput) {
  return [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    },
    {
      role: 'user',
      // Adjust the label and format to match your use case
      content: `[Your input label]:\n\n${userInput}`
    }
  ]
}

// Export SYSTEM_PROMPT for testing and documentation
export { SYSTEM_PROMPT }
