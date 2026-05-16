// 🚨 BROKEN: Cart page also doing its own fetch — third different pattern in the codebase!

import { useState, useEffect } from 'react'

export default function CartPage() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [removing, setRemoving] = useState(null)

  // ❌ Yet another hardcoded URL — count how many exist in this codebase!
  useEffect(() => {
    fetch(`https://fakestoreapi.com/carts/user/1`)
      .then(res => res.json()) // ❌ Not checking res.ok at all!
      .then(async (carts) => {
        if (!carts || carts.length === 0) {
          setCart({ products: [] })
          setLoading(false)
          return
        }
        const latest = carts[carts.length - 1]
        // ❌ Nested fetches — very hard to read and maintain
        const productDetails = await Promise.all(
          latest.products.map(item =>
            fetch(`https://fakestoreapi.com/products/${item.productId}`) // URL #5!
              .then(r => r.json())
              .then(p => ({ ...p, quantity: item.quantity }))
          )
        )
        setCart({ ...latest, productDetails })
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load your cart') // generic error, no logging, no retry
        setLoading(false)
      })
  }, [])

  const handleRemove = async (productId) => {
    setRemoving(productId)
    const token = localStorage.getItem('auth_token') // AGAIN manual token retrieval
    try {
      await fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      setCart(prev => ({ ...prev, productDetails: prev.productDetails.filter(p => p.id !== productId) }))
    } catch (err) {
      alert('Remove failed: ' + err.message) // alert() again!
    }
    setRemoving(null)
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
    </div>
  )
  if (error) return <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-4 text-sm">{error}</div>

  const items = cart?.productDetails || []
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) return (
    <div className="text-center py-24">
      <p className="text-4xl mb-4">🛒</p>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-sm text-gray-400 mb-6">Find some awesome dev tools to get started!</p>
      <a href="/" className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">Browse Tools</a>
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <p className="text-gray-500 text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-3">
          {items.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex items-start gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 leading-snug mb-1">{item.title.slice(0, 60)}...</p>
                <p className="text-xs text-gray-400">${item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={removing === item.id}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  {removing === item.id ? '...' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-xl p-5 h-fit flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-500"><span>Tax</span><span>$0.00</span></div>
            <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <button className="w-full bg-gray-900 text-white text-sm py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium">
            Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}
