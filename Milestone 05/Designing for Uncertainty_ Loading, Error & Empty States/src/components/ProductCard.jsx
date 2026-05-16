import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
        Product Image
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800 leading-tight">{product.name}</h3>
        <span className="text-sm font-semibold text-blue-600">${product.price.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">{product.category}</p>
      <div className="flex justify-between items-center text-xs">
        <span className={`${product.stock < 10 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
          Stock: {product.stock}
        </span>
        <button className="text-blue-600 hover:underline font-medium">Edit Item</button>
      </div>
    </div>
  );
};

export default ProductCard;
