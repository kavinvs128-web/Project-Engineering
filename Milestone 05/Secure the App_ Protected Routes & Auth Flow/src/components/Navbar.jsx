import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

/**
 * Navbar component.
 * BUG 4: Navbar ignores auth state completely.
 * It always shows the "Login" link and never shows "Logout" or the User info.
 */
function Navbar() {
  // ❌ BUG 4: useAuth() hook is not called here
  // const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-brand-600 font-bold text-xl">
          <Shield className="w-6 h-6" />
          <span>VaultApp</span>
        </Link>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/dashboard" className="text-slate-600 hover:text-brand-600 transition-colors">Dashboard</Link>
          <Link to="/settings" className="text-slate-600 hover:text-brand-600 transition-colors">Settings</Link>
          
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          
          {/* ❌ BUG 4: Hardcoded Login link, no Logout option */}
          <Link 
            to="/login" 
            className="bg-brand-50 text-brand-600 px-4 py-2 rounded-lg hover:bg-brand-100 transition-all font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
