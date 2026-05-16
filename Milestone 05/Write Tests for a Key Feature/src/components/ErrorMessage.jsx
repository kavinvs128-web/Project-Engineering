import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-xl max-w-md mx-auto">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
        <p className="text-red-200 font-medium">{message}</p>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-red-900/40 active:scale-95 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
