import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Layout, Mail, Lock, AlertCircle, ShieldCheck } from 'lucide-react'

/**
 * Login Page.
 * This component is intended to work correctly.
 * The bugs are in the plumbing (main.jsx, context, router).
 */
function Login() {
  const [email, setEmail] = useState('demo@vault.app')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulation of API call
    setTimeout(() => {
      if (email === 'demo@vault.app' && password === 'password123') {
        const userData = { email, name: 'Demo User', role: 'Premium' }
        const fakeToken = 'eyJhYmMiOiIxMjMiLCJ4eXoiOiI0NTYifQ.mock-token'
        
        // BUG 1 check: if auth is null, this will crash or do nothing
        if (auth && auth.login) {
          auth.login(userData, fakeToken)
          navigate('/dashboard')
        } else {
          setError('Auth system failure. Please check the implementation.')
          console.error('Critical: AuthContext is not available!')
        }
      } else {
        setError('Invalid email or password')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 card bg-white shadow-xl border-slate-200 sm:px-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-brand-50 rounded-2xl mb-4">
          <ShieldCheck className="w-8 h-8 text-brand-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Sign in to VaultApp</h1>
        <p className="text-slate-500 text-sm mt-2">Enter your credentials to access your secure dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="demo@vault.app"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-10"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary h-11"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        <p>Use <span className="font-bold">demo@vault.app</span> / <span className="font-bold">password123</span></p>
      </div>
    </div>
  )
}

export default Login
