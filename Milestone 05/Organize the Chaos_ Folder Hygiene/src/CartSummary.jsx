import React, { useState } from 'react';
import { useCart } from './useCart';
import CartItem from './CartItem';
import { formatCurrency } from './formatCurrency';
import EmptyState from './EmptyState';
import Button from './Button';
import CheckoutModal from './CheckoutModal';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartState }) => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart(cartState.cart, cartState.setCart);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <EmptyState 
          title="Your cart is empty" 
          message="Looks like you haven't added anything to your cart yet. Go back to products to find something you love."
          icon={ShoppingBag}
        />
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-8 border-b border-slate-100 pb-8 flex items-center gap-4">
        Shopping Cart
        <span className="text-lg font-bold bg-slate-100 px-4 py-1 rounded-full text-slate-500">{totalItems} items</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 sticky top-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-slate-500 font-medium pb-4 border-b border-slate-50">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 font-medium pb-4 border-b border-slate-50">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase tracking-tight">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-2xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-extrabold text-slate-900">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              className="w-full py-5 text-xl"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            
            <Link to="/" className="block text-center mt-6 text-slate-500 font-bold hover:text-slate-900 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={() => {
          clearCart();
          setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
};

export default CartSummary;
