export async function loginUser({ email, password }) {
  // Real fetch call to a mock endpoint
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.message || 'Invalid credentials')
  }
  return response.json()
}
