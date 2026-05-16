import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 border border-white/10 rounded-2xl max-w-lg mx-auto backdrop-blur-sm">
      <div className="mb-6 p-4 bg-primary-900/40 rounded-full border border-primary-500/10">
        <PackageOpen className="w-12 h-12 text-primary-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-xs">{message}</p>
    </div>
  );
};

export default EmptyState;
