import React, { useState } from 'react';
import { useProducts } from './useProducts';
import ProductCard from './ProductCard';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { useDebounce } from './useDebounce';
import { Search, ShoppingBag } from 'lucide-react';

const ProductList = ({ onAddToCart }) => {
  const { products, isLoading, error, refetch } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Spinner className="w-12 h-12 mb-4" />
        <p className="text-slate-500 font-medium">Loading collection...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Modern Living</h2>
          <p className="text-slate-500 font-medium">Explore our curated selection of fine home goods.</p>
        </div>
        
        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-6 py-3 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <ShoppingBag className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No matching products found</h3>
            <p className="text-slate-500">Try searching for something else, like "chair" or "vase".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
