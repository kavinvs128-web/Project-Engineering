import React from 'react';

const EmptyState = ({ title, message, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
      {Icon && <Icon className="w-16 h-16 text-slate-300 mb-4" />}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title || 'Nothing found'}</h3>
      <p className="text-slate-500 max-w-sm">{message || 'There is no data to display at the moment.'}</p>
    </div>
  );
};

export default EmptyState;
