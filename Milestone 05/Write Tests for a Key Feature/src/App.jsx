import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './features/LoginForm';
import OrdersList from './features/OrdersList';
import { LogOut, User } from 'lucide-react';

const Header = ({ user }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg shadow-lg shadow-primary-500/20" />
        <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          FormFlow
        </span>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <User className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-slate-300">{user.email}</span>
          </div>
          <button 
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
};

const Layout = ({ children, user }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header user={user} />
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        {children}
      </main>
      
      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-slate-500 text-sm">
          Built with &hearts; for the React Testing Challenge.
        </p>
      </footer>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout user={user}>
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-3">Your Orders</h2>
          <p className="text-slate-400">Manage and track your recent activity.</p>
        </div>
        <OrdersList />
      </div>
    </Layout>
  );
};

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6">
      <div className="mb-12 flex items-center gap-3 scale-125">
        <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-xl shadow-2xl shadow-primary-500/40" />
        <span className="text-3xl font-black tracking-tight text-white uppercase italic">
          FormFlow
        </span>
      </div>
      <LoginForm />
      <div className="mt-8 text-slate-500 text-sm flex items-center gap-1.5 opacity-60">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        All systems operational
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
