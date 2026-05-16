import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const link = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
        pathname === to ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-gray-900 text-lg tracking-tight">
          ⚡ DevMarket
        </Link>
        <div className="flex items-center gap-1">
          {link('/', 'Browse')}
          {link('/cart', 'Cart')}
          {link('/profile', 'Profile')}
        </div>
      </div>
    </nav>
  )
}
