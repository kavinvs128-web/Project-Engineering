// frontend/src/config.js
// API configuration for the frontend

// ============================================================
// This code is CORRECT — it reads from the Vite env variable.
// The BUG is that VITE_API_URL is not set in the Render
// dashboard, so `import.meta.env.VITE_API_URL` is undefined
// at build time. The built bundle will contain "undefined"
// as the API URL, causing all requests to fail.
// ============================================================

export const API_URL = import.meta.env.VITE_API_URL;

// Helper for making API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Attach auth token if available
  const token = localStorage.getItem("token");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Something went wrong");
  }

  return response.json();
};
