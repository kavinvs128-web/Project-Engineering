// 🚨 BROKEN: Profile page — same mess but now with form submission too.

import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [form, setForm] = useState({ email: '', username: '', phone: '' })

  // ❌ BAD: 6th hardcoded URL in the project!
  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/1`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setUser(data)
        setForm({ email: data.email || '', username: data.username || '', phone: data.phone || '' })
        setLoading(false)
      })
      .catch(err => {
        // ❌ No shared error handling — each component writes its own version
        if (err.message.includes('401')) {
          setError('You need to log in')
        } else {
          setError('Could not load profile: ' + err.message)
        }
        setLoading(false)
      })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const token = localStorage.getItem('auth_token') // AGAIN — 4th time in this codebase!
    try {
      const res = await fetch(`https://fakestoreapi.com/users/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      if (res.status === 401) {
        // ❌ Manual 401 check — should be a global interceptor!
        setError('Session expired. Please log in again.')
        setSaving(false)
        return
      }
      if (!res.ok) throw new Error('Failed to update profile')
      const updated = await res.json()
      setUser(updated)
      setSaveMsg('Profile saved!')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch (err) {
      setSaveMsg('Save failed: ' + err.message)
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
    </div>
  )
  if (error) return <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-4 text-sm">{error}</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your DevMarket account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">
            {user?.name?.firstname?.[0]?.toUpperCase()}{user?.name?.lastname?.[0]?.toUpperCase()}
          </div>
          <p className="font-semibold text-gray-900">{user?.name?.firstname} {user?.name?.lastname}</p>
          <p className="text-xs text-gray-400 mb-4">@{user?.username}</p>
          <div className="flex gap-6 border-t border-gray-100 pt-4 w-full justify-center">
            {[['12', 'Purchases'], ['4', 'Reviews'], ['7', 'Wishlist']].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center">
                <span className="font-bold text-gray-900">{n}</span>
                <span className="text-xs text-gray-400">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Edit Profile</h2>
          {saveMsg && (
            <div className={`text-sm rounded-lg p-3 mb-4 ${saveMsg.includes('saved') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {saveMsg}
            </div>
          )}
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {[['Username', 'text', 'username', 'your-username'], ['Email', 'email', 'email', 'you@example.com'], ['Phone', 'tel', 'phone', '+1 234 567 8900']].map(([label, type, key, placeholder]) => (
              <div key={key}>
                <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
              </div>
            ))}
            <button type="submit" disabled={saving} className="self-start bg-gray-900 text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
