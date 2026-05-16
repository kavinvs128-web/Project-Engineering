import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [balances, setBalances] = useState(null)
  const [roommates, setRoommates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [desc, setDesc] = useState("")
  const [amount, setAmount] = useState("")
  const [payerId, setPayerId] = useState("")
  const [newName, setNewName] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  const fetchData = async () => {
    try {
      setLoading(true)
      const [expRes, balRes, rmRes] = await Promise.all([
        fetch(`${API_URL}/expenses`),
        fetch(`${API_URL}/expenses/balances`),
        fetch(`${API_URL}/expenses/roommates`)
      ])
      
      const [expData, balData, rmData] = await Promise.all([
        expRes.json(), balRes.json(), rmRes.json()
      ])
      
      setExpenses(expData)
      setBalances(balData)
      setRoommates(rmData)
      setError(null)
    } catch (err) {
      setError("Synchronization failed.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleAddExpense = async (e) => {
    e.preventDefault()
    if (!desc || !amount || !payerId) return alert("Please fill everything")
    try {
      await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc, amount: parseFloat(amount), payerId: parseInt(payerId) })
      })
      setDesc(""); setAmount(""); fetchData()
    } catch (err) { setError("POST failed") }
  }

  const handleAddRoommate = async (e) => {
    e.preventDefault()
    if (!newName) return
    try {
      await fetch(`${API_URL}/expenses/roommates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      })
      setNewName(""); fetchData()
    } catch (err) { setError("Roommate create failed") }
  }

  return (
    <div className="bento-grid">
      <div className="header">
        <h1>Roommate Wars</h1>
        <p>Dynamic cost-splitting for modern households.</p>
        {error && <p style={{ color: '#f43f5e', fontSize: '0.9rem' }}>{error}</p>}
      </div>

      <div className="bento-card span-2">
        <h2 style={{ opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Household Spend</h2>
        <div className="big-number">
            {loading ? "..." : `$${balances?.summary?.totalShared || balances?.total || '0'}`}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--bento-accent)' }}>
            Allocated across {roommates.length} people.
        </p>
      </div>

      <div className="bento-card span-2">
        <h2>Household Status</h2>
        <div style={{ marginTop: '15px' }}>
          {balances?.roommates?.map(r => (
            <div key={r.name} className="history-item">
              <span style={{ fontWeight: 600 }}>{r.name}</span>
              <span style={{ 
                color: r.balance >= 0 ? '#10b981' : '#f43f5e', 
                fontWeight: 800 
              }}>
                {r.balance >= 0 ? `Owed $${r.balance}` : `Owes $${Math.abs(r.balance)}`}
              </span>
            </div>
          ))}
          {roommates.length === 0 && <p style={{ opacity: 0.5 }}>Register people to calculate status.</p>}
        </div>
      </div>

      <div className="bento-card">
        <h2>Personnel</h2>
        <form onSubmit={handleAddRoommate} style={{ marginBottom: '20px' }}>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name..." />
          <button className="btn">Add Person</button>
        </form>
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {roommates.map(r => (
                <div key={r.id} style={{ fontSize: '0.9rem', padding: '4px', borderBottom: '1px solid #eee' }}>• {r.name}</div>
            ))}
        </div>
      </div>

      <div className="bento-card">
        <h2>Add Expense</h2>
        <form onSubmit={handleAddExpense}>
            <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description..." />
            <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount..." />
            <select 
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #f1f5f9', background: '#f8fafc', marginBottom: '12px', fontWeight: 600 }}
                value={payerId}
                onChange={e => setPayerId(e.target.value)}
            >
                <option value="">Paid by who?</option>
                {roommates.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <button className="btn">Submit</button>
        </form>
      </div>

      <div className="bento-card span-2">
        <h2>Registry</h2>
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {expenses.length === 0 ? <p style={{ opacity: 0.5 }}>No logs found.</p> : (
            expenses.map(e => (
              <div className="history-item" key={e.id}>
                <div>
                    <div style={{ fontWeight: '800' }}>{e.description}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Paid by {e.payer?.name}</div>
                </div>
                <span style={{ fontWeight: '800' }}>${parseFloat(e.amount).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
