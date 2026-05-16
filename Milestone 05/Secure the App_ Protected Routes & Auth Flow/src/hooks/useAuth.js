import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * A custom hook that provides easy access to the auth context.
 * Re-exports the AuthContext values.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // This will happen if components call useAuth() and AuthProvider is missing
    return null 
  }
  return context
}
