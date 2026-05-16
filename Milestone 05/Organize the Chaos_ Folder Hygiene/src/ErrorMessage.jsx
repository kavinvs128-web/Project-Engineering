import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="p-6 bg-red-50 border border-red-100 rounded-xl text-center max-w-md mx-auto my-8">
      <p className="text-red-700 font-medium mb-4">{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
