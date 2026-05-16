import { useState, useEffect } from "react";
import { API_URL, apiRequest } from "./config";

// ============================================================
// LinkShelf Frontend — minimal app to demonstrate CORS errors
// This app makes real fetch() calls to the backend API.
// When CORS is misconfigured, you'll see errors in the
// browser DevTools Network tab.
// ============================================================

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auth form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // Bookmark form state
  const [bmUrl, setBmUrl] = useState("");
  const [bmTitle, setBmTitle] = useState("");
  const [bmDesc, setBmDesc] = useState("");

  // Fetch bookmarks when logged in
  useEffect(() => {
    if (token) {
      fetchBookmarks();
    }
  }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const body = isSignup
        ? { email, password, name }
        : { email, password };

      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const data = await apiRequest("/api/bookmarks");
      setBookmarks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addBookmark = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiRequest("/api/bookmarks", {
        method: "POST",
        body: JSON.stringify({
          url: bmUrl,
          title: bmTitle,
          description: bmDesc,
        }),
      });
      setBmUrl("");
      setBmTitle("");
      setBmDesc("");
      fetchBookmarks();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      await apiRequest(`/api/bookmarks/${id}`, { method: "DELETE" });
      fetchBookmarks();
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setBookmarks([]);
  };

  // ---- Styles ----
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "14px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#4f46e5",
      color: "white",
      fontSize: "14px",
      cursor: "pointer",
    },
    error: {
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px",
      fontSize: "14px",
    },
    card: {
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
    },
    link: {
      color: "#4f46e5",
      textDecoration: "none",
    },
    apiDebug: {
      backgroundColor: "#f8f9fa",
      padding: "12px",
      borderRadius: "6px",
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📚 LinkShelf</h1>
        <p>Save and organize your bookmarks</p>
      </div>

      {/* Debug: Show the API URL so students can see the problem */}
      <div style={styles.apiDebug}>
        <strong>API URL:</strong> {API_URL || "⚠️ undefined (VITE_API_URL not set!)"}
      </div>

      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
          <br />
          <small>💡 Open DevTools → Network tab to see CORS errors</small>
        </div>
      )}

      {!token ? (
        /* ---- Auth Form ---- */
        <div>
          <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
          <form onSubmit={handleAuth} style={styles.form}>
            {isSignup && (
              <input
                style={styles.input}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
          <p style={{ textAlign: "center" }}>
            <button
              onClick={() => setIsSignup(!isSignup)}
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                color: "#4f46e5",
                border: "1px solid #4f46e5",
              }}
            >
              {isSignup
                ? "Already have an account? Log in"
                : "Need an account? Sign up"}
            </button>
          </p>
        </div>
      ) : (
        /* ---- Bookmarks Dashboard ---- */
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Your Bookmarks</h2>
            <button
              onClick={logout}
              style={{
                ...styles.button,
                backgroundColor: "#ef4444",
                fontSize: "12px",
                padding: "6px 12px",
              }}
            >
              Logout
            </button>
          </div>

          {/* Add Bookmark Form */}
          <form onSubmit={addBookmark} style={styles.form}>
            <input
              style={styles.input}
              type="url"
              placeholder="URL (https://...)"
              value={bmUrl}
              onChange={(e) => setBmUrl(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Title"
              value={bmTitle}
              onChange={(e) => setBmTitle(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Description (optional)"
              value={bmDesc}
              onChange={(e) => setBmDesc(e.target.value)}
            />
            <button style={styles.button} type="submit">
              + Save Bookmark
            </button>
          </form>

          {/* Bookmarks List */}
          {bookmarks.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9ca3af" }}>
              No bookmarks yet. Save your first link!
            </p>
          ) : (
            bookmarks.map((bm) => (
              <div key={bm.id} style={styles.card}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 4px 0" }}>{bm.title}</h3>
                    <a
                      href={bm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      {bm.url}
                    </a>
                    {bm.description && (
                      <p style={{ color: "#6b7280", margin: "8px 0 0 0" }}>
                        {bm.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteBookmark(bm.id)}
                    style={{
                      ...styles.button,
                      backgroundColor: "#ef4444",
                      fontSize: "12px",
                      padding: "4px 10px",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
