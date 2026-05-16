// 🚨 BROKEN: Another component doing everything itself.
// Notice this is basically copy-pasted from ProductsPage — every dev writes fetch() differently!

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const enrich = (p) => ({
  ...p,
  type: ['API', 'Template', 'CLI Tool', 'SDK', 'Plugin'][p.id % 5],
  pricing: p.id % 3 === 0 ? 'free' : 'paid',
  stars: (3.5 + (p.id % 15) / 10).toFixed(1),
  downloads: Math.floor(p.id * 847 + 1200),
  version: `v${Math.floor(p.id / 3) + 1}.${p.id % 10}.0`,
  language: ['TypeScript', 'Python', 'Go', 'Rust', 'JavaScript'][p.id % 5],
})

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inCart, setInCart] = useState(false)
  const [reviewLoading, setReviewLoading] = useState(false)

  // ❌ BAD: Yet another hardcoded URL with its own error handling pattern
  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(async res => {
        if (res.status === 404) throw new Error('Product not found')
        // ❌ No handling for 401, 500, etc.
        return res.json()
      })
      .then(data => {
        const enriched = enrich(data)
        setProduct(enriched)
        // ❌ Nested fetch inside a fetch — spaghetti code!
        return fetch(`https://fakestoreapi.com/products/category/${enriched.category}`)
      })
      .then(res => res.json())
      .then(items => {
        setRelated(items.filter(p => p.id !== parseInt(id)).slice(0, 3))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  // ❌ Token grabbed manually AGAIN — fourth time in this codebase
  const handleAddToCart = async () => {
    const token = localStorage.getItem('auth_token')
    try {
      const res = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: 1, date: new Date().toISOString(), products: [{ productId: product.id, quantity: 1 }] }),
      })
      if (!res.ok) throw new Error('Cart update failed')
      setInCart(true)
    } catch (err) {
      alert('Failed to add: ' + err.message) // alert()? seriously?
    }
  }

  const handleReview = async (e) => {
    e.preventDefault()
    setReviewLoading(true)
    const token = localStorage.getItem('auth_token') // copied AGAIN
    try {
      await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productId: id, rating: 5 }),
      })
      setReviewLoading(false)
      alert('Review submitted!')
    } catch (err) {
      setReviewLoading(false)
      alert('Review failed: ' + err.message)
    }
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
    </div>
  )
  if (error) return <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-4 text-sm">{error}</div>

  return (
    <div>
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-1">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{product.type}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{product.language}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${product.pricing === 'free' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
              {product.pricing === 'free' ? 'Free' : `$${product.price}`}
            </span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 leading-snug">{product.title}</h1>

          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span>⭐ {product.stars}</span>
            <span>↓ {product.downloads.toLocaleString()}</span>
            <span>📦 {product.version}</span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Quick install</p>
            <code className="text-sm text-gray-800 font-mono">npm install {product.title.split(' ')[0].toLowerCase()}-sdk</code>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Leave a Review</h3>
            <form onSubmit={handleReview} className="flex flex-col gap-3">
              <textarea
                placeholder="Share your experience..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
              />
              <button type="submit" disabled={reviewLoading} className="self-start bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <p className={`text-2xl font-bold ${product.pricing === 'free' ? 'text-green-600' : 'text-gray-900'}`}>
              {product.pricing === 'free' ? 'Free' : `$${product.price}`}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${inCart ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
            >
              {inCart ? '✓ Added' : 'Add to Cart'}
            </button>
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              {[['Category', product.category], ['Language', product.language], ['Version', product.version], ['License', 'MIT']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-gray-400">{k}</span>
                  <span className="text-gray-700 capitalize">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Related</p>
              {related.map(p => (
                <div key={p.id} onClick={() => navigate(`/products/${p.id}`)} className="border border-gray-200 rounded-xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{['API', 'Template', 'CLI Tool', 'SDK', 'Plugin'][p.id % 5]}</span>
                  <p className="text-xs text-gray-700 mt-2 leading-snug">{p.title.slice(0, 45)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
