// frontend/src/config.js
// Frontend API configuration

// ============================================================
// BUG: The API URL is HARDCODED to localhost.
// This works during local development but will FAIL in
// production — the deployed frontend will try to reach
// localhost:3000, which doesn't exist on the user's browser.
//
// SHOULD USE: import.meta.env.VITE_API_URL
// ============================================================

export const API_URL = "http://localhost:3000/api";

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
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Something went wrong");
  }

  return response.json();
};
