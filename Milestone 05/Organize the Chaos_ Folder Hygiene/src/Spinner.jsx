import React from 'react';

const Spinner = ({ className = 'w-5 h-5' }) => {
  return (
    <div className={`animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 ${className}`} />
  );
};

export default Spinner;
