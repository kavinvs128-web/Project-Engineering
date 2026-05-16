// 🚨 BROKEN: This component is doing WAY too much.
// It mixes UI, data fetching, error handling all in one place.
// As a new dev joining this team, your job is to clean this up!

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ❌ BAD: API URL hardcoded at the top — what if it changes?
const BASE_URL = 'https://fakestoreapi.com'

const enrich = (p) => ({
  ...p,
  type: ['API', 'Template', 'CLI Tool', 'SDK', 'Plugin'][p.id % 5],
  pricing: p.id % 3 === 0 ? 'free' : 'paid',
  stars: (3.5 + (p.id % 15) / 10).toFixed(1),
  downloads: Math.floor(p.id * 847 + 1200),
})

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [cartMsg, setCartMsg] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  // ❌ BAD: Raw fetch with no interceptors, no token injection, inconsistent error handling
  useEffect(() => {
    setLoading(true)
    fetch('https://fakestoreapi.com/products') // hardcoded again!
      .then(res => {
        if (!res.ok) throw new Error('Failed to load products')
        return res.json()
      })
      .then(data => {
        setProducts(data.map(enrich))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message) // no global error handler — each component reinvents the wheel
        setLoading(false)
      })
  }, [])

  // ❌ BAD: Second separate fetch — duplicated pattern, no code sharing
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories') // another hardcoded URL
      .then(res => res.json()) // not even checking res.ok!
      .then(data => setCategories(['all', ...data]))
      .catch(err => console.error('Failed to load categories:', err)) // silently failing!
  }, [])

  // ❌ BAD: Token grabbed manually every time, copy-pasted pattern
  const handleAddToCart = (product) => {
    const token = localStorage.getItem('auth_token')

    fetch('https://fakestoreapi.com/carts', { // URL #3 hardcoded
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // repeated in every component
      },
      body: JSON.stringify({
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId: product.id, quantity: 1 }],
      }),
    })
      .then(res => res.json())
      .then(() => {
        setCart(prev => [...prev, product.id])
        setCartMsg(`Added "${product.title.slice(0, 25)}..."`)
        setTimeout(() => setCartMsg(''), 3000)
      })
      .catch(err => {
        // ❌ No global 401 handling — user just sees a broken UI
        console.error('Cart error:', err)
        setCartMsg('Failed to add to cart')
        setTimeout(() => setCartMsg(''), 3000)
      })
  }

  const filtered = products
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-4 text-sm">{error}</div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Browse Dev Tools</h1>
        <p className="text-gray-500 text-sm mt-1">APIs, templates, CLI tools and more — built by devs, for devs.</p>
      </div>

      {cartMsg && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg z-50">
          {cartMsg}
        </div>
      )}

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-xs border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-gray-400 transition-colors">
            <div className="flex gap-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{product.type}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${product.pricing === 'free' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                {product.pricing === 'free' ? 'Free' : `$${product.price}`}
              </span>
            </div>
            <Link to={`/products/${product.id}`} className="text-sm font-semibold text-gray-900 hover:text-gray-600 leading-snug">
              {product.title.slice(0, 55)}{product.title.length > 55 ? '...' : ''}
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed flex-1">{product.description.slice(0, 75)}...</p>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>⭐ {product.stars}</span>
              <span>↓ {product.downloads.toLocaleString()}</span>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={cart.includes(product.id)}
              className={`w-full text-sm py-2 rounded-lg font-medium transition-colors ${
                cart.includes(product.id)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              {cart.includes(product.id) ? '✓ In Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16 text-sm">No tools found for "{searchTerm}"</p>
      )}
    </div>
  )
}
