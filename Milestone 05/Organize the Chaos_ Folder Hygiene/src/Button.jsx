import React from 'react';
import Spinner from './Spinner';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  isLoading = false, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:scale-100 disabled:opacity-50";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    outline: "bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? <Spinner className="w-5 h-5 border-t-white" /> : children}
    </button>
  );
};

export default Button;
