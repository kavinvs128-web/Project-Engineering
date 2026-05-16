import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

/**
 * App Router Configuration.
 * BUG 3: All routes are public. There is no ProtectedRoute component used.
 * The developer "forgot" to wrap private routes.
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* ❌ BUG 3: Private routes are directly accessible via URL */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="*" element={<div className="p-10 text-center">404 Not Found</div>} />
        </Routes>
      </main>
      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200">
        &copy; {new Date().getFullYear()} VaultApp Security. Built for training purposes.
      </footer>
    </div>
  )
}

export default App
