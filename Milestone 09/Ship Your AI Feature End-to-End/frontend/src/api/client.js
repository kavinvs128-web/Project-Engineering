// frontend/src/api/client.js
// CONSTRAINT 1: API key must NEVER appear in this file.
// The frontend calls YOUR backend. The backend calls OpenRouter.
// Replace '/analyze' with your actual endpoint.

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function analyzeContent(input, token) {
  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text: input })  // Update field name to match your feature
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}
