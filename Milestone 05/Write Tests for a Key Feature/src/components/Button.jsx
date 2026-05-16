import React from 'react';

const Button = ({ 
  label, 
  onClick, 
  disabled = false, 
  loading = false,
  type = "button",
  className = "" 
}) => {
  const handleClick = (e) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
        ${disabled || loading 
          ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
          : 'bg-primary-600 hover:bg-primary-500 text-white active:scale-95 shadow-lg shadow-primary-500/20'} 
        ${className}`}
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default Button;
