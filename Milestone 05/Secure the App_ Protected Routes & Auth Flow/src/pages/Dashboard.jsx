import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, User, RefreshCw } from 'lucide-react'

/**
 * Dashboard Page.
 * Realistic private page that SHOULD be protected but isn't.
 */
function Dashboard() {
  const transactions = [
    { id: 1, name: 'Cloud Services', amount: -120.50, status: 'Completed', type: 'debit' },
    { id: 2, name: 'Payment Received', amount: 2500.00, status: 'Completed', type: 'credit' },
    { id: 3, name: 'Office Rent', amount: -800.00, status: 'Pending', type: 'debit' },
    { id: 4, name: 'Software Subscription', amount: -49.99, status: 'Completed', type: 'debit' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your secure assets and recent activity.</p>
        </div>
        <button className="flex items-center space-x-2 text-brand-600 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-lg transition-all font-medium">
          <RefreshCw className="w-4 h-4" />
          <span>Sync Account</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 rounded-lg"><DollarSign className="text-green-600 w-5 h-5" /></div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Balance</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">$42,500.80</h3>
        </div>
        
        <div className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg"><TrendingUp className="text-blue-600 w-5 h-5" /></div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">+5.2%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Investments</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">$12,450.00</h3>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-50 rounded-lg"><User className="text-slate-600 w-5 h-5" /></div>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Active</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Linked Accounts</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">4 Direct Feeds</h3>
        </div>
      </div>

      <div className="card">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-900">Recent Transactions</h4>
          <button className="text-brand-600 text-sm font-bold hover:underlineTransition">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Beneficiary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    t.type === 'debit' ? 'text-slate-900' : 'text-green-600'
                  }`}>
                    {t.type === 'debit' ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
