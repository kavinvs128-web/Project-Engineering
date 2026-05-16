import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

/**
 * AuthProvider provides the authentication state to the application.
 * Note: Submitting multiple bugs here for the student to find.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // BUG 2: Login handles state but fails to persist the session to localStorage
  const login = (userData, fakeToken) => {
    setUser(userData)
    setToken(fakeToken)
    
    // ❌ Missing: localStorage.setItem('authToken', fakeToken)
    // ❌ Missing: localStorage.setItem('authUser', JSON.stringify(userData))
    console.log('✅ User logged in:', userData.email)
  }

  // BUG 3 (Part 2): Logout clears state but may leave data in storage or has issues
  const logout = () => {
    setUser(null)
    setToken(null)
    // ❌ Missing: localStorage.removeItem('authToken')
    // ❌ Missing: localStorage.removeItem('authUser')
    console.log('🚪 User logged out')
  }

  // BUG 2 (Part 2): Missing useEffect to load user from localStorage on mount

  const value = {
    user,
    token,
    isAuthenticated: !!token, // Derived state for Bug 3
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
