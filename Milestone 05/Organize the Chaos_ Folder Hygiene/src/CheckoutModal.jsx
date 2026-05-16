import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { submitOrder } from './cartService';
import { PackageCheck, CheckCircle2, ChevronRight } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      await submitOrder([]); // Mock cart submission
      setIsDone(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      alert('Checkout failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Order">
      {!isDone ? (
        <div className="text-center py-6">
          <div className="w-24 h-24 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100">
            <PackageCheck size={48} className="animate-bounce" />
          </div>
          <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Ready to ship?</h4>
          <p className="text-slate-500 max-w-xs mx-auto mb-10 leading-relaxed font-medium">Click the button below to complete your checkout and we'll start packing your order.</p>
          
          <div className="space-y-4">
            <Button 
              className="w-full text-lg py-5" 
              onClick={handleCheckout} 
              isLoading={isSubmitting}
            >
              Confirm Checkout
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
            
            <button 
              onClick={onClose}
              className="text-slate-400 font-bold hover:text-slate-600 transition-colors py-2"
            >
              Wait, I'm not done
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100 shadow-xl shadow-green-50">
            <CheckCircle2 size={48} />
          </div>
          <h4 className="text-3xl font-black text-slate-900 mb-2 italic">Success!</h4>
          <p className="text-slate-500 font-medium max-w-xs mx-auto">Your order is on the way. You'll receive a confirmation email shortly.</p>
        </div>
      )}
    </Modal>
  );
};

export default CheckoutModal;
