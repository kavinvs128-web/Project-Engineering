# LearnLens — Prompt Engineering Challenge: Good Prompt, Bad Prompt

LearnLens is a student tools platform designed to help learners streamline their study workflows, from reviewing biology notes to preparing for technical interviews. This repository contains the AI prompt system powering three core LearnLens features.

Your objective is to identify systemic weaknesses in three "bad" prompts, rewrite them using the industry-standard five-component structure, and demonstrate measurable improvement in output quality and structural reliability.

## The Challenge
The repository contains:
1.  **Task A — Notes Reviewer**: Evaluates biology notes for clarity and completeness.
2.  **Task B — Placement Summariser**: Converts technical interview reports into structured highlights.
3.  **Task C — Error Analyst**: Diagnoses React errors and suggests fixes.

The three original prompts located in `prompts/originals.js` are failing to produce reliable outputs for our dashboard. You must fix them in `prompts/rewritten.js`.

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- An LLM API Key. You can get a free one from:
    - [Groq](https://console.groq.com/keys) (Fastest inference)
    - [Google AI Studio](https://aistudio.google.com/) (Gemini models)
    - [OpenRouter](https://openrouter.ai/) (Access to many models)

### 2. Installation
1.  Clone the repository and enter the directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment:
    ```bash
    cp .env.example .env
    ```
4.  Open `.env` and add your `API_KEY`. If you are using Groq or another provider, update `LLM_BASE_URL` (e.g., `https://api.groq.com/openai/v1`) and `LLM_MODEL` (e.g., `llama-3.1-70b-versatile`).

---

## How to Complete the Challenge

### Step 1: Baseline Analysis
Run the "bad" version of each task to see how the current prompts perform.
```bash
node runner --task=a --version=bad --temperature=0.7
node runner --task=b --version=bad --temperature=0.7
node runner --task=c --version=bad --temperature=0.7
```
Check `PROMPT_COMPARISON.md` and document the missing components in the original prompts.

### Step 2: Implementation
Open `prompts/rewritten.js` and implement all three prompts. Each prompt **must** use the five-component structure:
1.  **Persona**: Define the AI's professional identity.
2.  **Context**: Provide specific background using delimiters where relevant.
3.  **Task**: Clearly state the objective.
4.  **Format Constraints**: Define the exact structural output (e.g., JSON shape).
5.  **Behavioral Constraints**: Set boundaries for the AI (e.g., "Do not hallucinate facts").

### Step 3: Performance Comparison
Run your "good" version and compare the output.
```bash
node runner --task=a --version=good --temperature=0.0
node runner --task=b --version=good --temperature=0.0
node runner --task=c --version=good --temperature=0.0
```
Note: Use `temperature=0.0` for your improved prompts to ensure deterministic, reliable results.

### Step 4: Submission
Record your findings, raw outputs, and improvement summaries in `PROMPT_COMPARISON.md`.

---

## Running the API (Optional)
While the challenge primarily uses the CLI runner, you can also test the prompts through the LearnLens backend:
```bash
npm start
```
The server runs on `http://localhost:3001` with the following endpoints:
- `GET /api/notes/:id/review?version=bad|good`
- `GET /api/interviews/:id/summary?version=bad|good`
- `POST /api/errors/analyse?version=bad|good`
