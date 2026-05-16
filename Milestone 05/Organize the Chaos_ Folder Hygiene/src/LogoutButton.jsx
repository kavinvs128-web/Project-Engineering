import React from 'react';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ onLogout }) => {
  return (
    <button 
      onClick={onLogout}
      className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-600"
      title="Logout"
    >
      <LogOut className="w-6 h-6" />
    </button>
  );
};

export default LogoutButton;
