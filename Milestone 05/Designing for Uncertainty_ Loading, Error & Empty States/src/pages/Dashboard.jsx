import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { BarChart3, Users, ShoppingBag, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-800 tracking-tight">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const { data: stats, isLoading, error } = useDashboard();

  // DELIBERATE GAP: No indicator that we're waiting for data or that an error happened.

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 tracking-tight">Overview Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats && (
          <>
            <StatCard 
              title="Revenue" 
              value={`$${stats.totalRevenue.toLocaleString()}`} 
              icon={DollarSign} 
              color="bg-green-100 text-green-600" 
            />
            <StatCard 
              title="Orders" 
              value={stats.totalOrders} 
              icon={ShoppingBag} 
              color="bg-purple-100 text-purple-600" 
            />
            <StatCard 
              title="Active Users" 
              value={stats.activeCustomers} 
              icon={Users} 
              color="bg-blue-100 text-blue-600" 
            />
            <StatCard 
              title="Avg Order" 
              value={`$${stats.averageOrderValue}`} 
              icon={BarChart3} 
              color="bg-orange-100 text-orange-600" 
            />
          </>
        )}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center text-gray-400">
        Chart Placeholder (Dashboard Content)
      </div>
    </div>
  );
};

export default Dashboard;
