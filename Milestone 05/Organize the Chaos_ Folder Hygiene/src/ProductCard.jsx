import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from './formatCurrency';
import { truncateText } from './truncateText';
import Button from './Button';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all border border-slate-100 group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {formatCurrency(product.price)}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-1">{truncateText(product.description, 80)}</p>
        
        <Button 
          variant="primary" 
          onClick={() => onAddToCart(product)}
          className="w-full h-12"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
