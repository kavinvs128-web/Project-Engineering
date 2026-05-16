import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  DollarSign, 
  Clock,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    address: string;
    bio: string; // Wasteful in list view
  };
  items: {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
      name: string;
      image: string;
      category: {
        name: string;
        description: string; // Wasteful in list view
      }
    }
  }[];
}

const DashboardApp: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeCustomers: 0,
    avgOrderValue: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/orders');
      const data = await response.json();
      setOrders(data);
      
      // Calculate mock stats from real data
      const total = data.reduce((acc: number, o: Order) => acc + (o.total || 0), 0);
      setStats({
        totalRevenue: total,
        totalOrders: data.length,
        activeCustomers: new Set(data.map((o: Order) => o.user?.id)).size,
        avgOrderValue: total / (data.length || 1)
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CANCELLED': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center font-bold">F</div>
            <span className="text-xl font-bold tracking-tight">Fragments</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-slate-800 rounded-lg text-primary-400">
            <ShoppingBag size={20} />
            <span className="font-medium">Orders List</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders, customers..." 
              className="w-full bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 rounded-full pl-10 pr-4 py-2 text-sm transition-all outline-none"
            />
          </div>
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold leading-none">Admin User</p>
                <p className="text-xs text-slate-500 mt-1">Super User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary-500">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Orders Performance Dashboard</h1>
              <div className="flex gap-3">
                <button 
                  onClick={fetchOrders}
                  disabled={loading}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <ShoppingBag size={16} />}
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Active Orders', value: stats.totalOrders.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Total Customers', value: stats.activeCustomers.toString(), icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
                { label: 'Avg Order Value', value: `$${stats.avgOrderValue.toFixed(2)}`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                    <div className={cn("p-3 rounded-xl", stat.bg)}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="text-emerald-600 font-semibold">+12.5%</span>
                    <span className="text-slate-400">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <h2 className="font-bold text-slate-800">Recent Transactions</h2>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-500 font-medium">Filtered by: Latest</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Products</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-6 py-4"><div className="h-4 w-12 bg-slate-100 rounded"></div></td>
                          <td className="px-6 py-4"><div className="h-4 w-32 bg-slate-100 rounded"></div></td>
                          <td className="px-6 py-4"><div className="h-6 w-20 bg-slate-100 rounded-full"></div></td>
                          <td className="px-6 py-4"><div className="h-4 w-40 bg-slate-100 rounded"></div></td>
                          <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-100 rounded"></div></td>
                          <td className="px-6 py-4 text-right"><div className="h-4 w-16 bg-slate-100 rounded ml-auto"></div></td>
                        </tr>
                      ))
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 group transition-colors">
                          <td className="px-6 py-4 font-mono font-medium text-slate-400">#{order.id.toString().padStart(4, '0')}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={order.user.avatarUrl} className="w-8 h-8 rounded-full bg-slate-100" />
                              <div>
                                <p className="font-semibold text-slate-900">{order.user.name}</p>
                                <p className="text-xs text-slate-500">{order.user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", getStatusColor(order.status))}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-slate-700 font-medium truncate max-w-[200px]">
                                {order.items.map(i => i.product.name).join(', ')}
                              </span>
                              <span className="text-xs text-slate-400">{order.items.length} items</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Clock size={14} className="text-slate-400" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900 italic">
                            ${order.total.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/50 flex justify-end">
                <p className="text-xs text-rose-600 font-bold italic">
                  Critical Lag: ~{(JSON.stringify(orders).length / 1024).toFixed(1)} KB payload (500+ items, N+1 Query, No Pagination)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardApp;
