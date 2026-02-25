import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, AlertTriangle, CheckCircle2, Tag, ArrowRight, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onStartBrowsing?: () => void;
  onSuccess?: (items: unknown[]) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onStartBrowsing, onSuccess }) => {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, total, originalTotal, clearCart, appliedCoupon, applyCoupon } = useCart();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    if (!agreedToTerms || isProcessing) return;
    setIsProcessing(true);

    const options = {
      key: "rzp_test_SJfQnrdSLLSJ2c",
      amount: total * 100,
      currency: "INR",
      name: "Arham Builds",
      description: `Cart: ${items.length} Items`,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGerWLzMB6sist_c1s9aQZ-18JCIOAuOzllZ0-Hx5gdjyJ4xiaoW4ItlvmDYzLmQaich3erS_p2rf3cmQCla-UZw0Gf2DGnzvFPUKVBj0njTizv5I9zqO6UK1db9tEQkx6pKil3umTOwqwZpmPf5R0dFXxqUxtUQ3I_pQ6om9DBuRhfhIKiMmu3aPcDNk/s820/cropped_circle_image%20(3)%20(1)%20(2)%20(1).png",
      handler: function (_response: unknown) {
        setIsProcessing(false);
        const currentItems = [...items];
        clearCart();
        toggleCart();
        if (onSuccess) onSuccess(currentItems);
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#2563eb" },
      modal: { ondismiss: () => setIsProcessing(false) }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleStartBrowsing = () => {
    toggleCart();
    if (onStartBrowsing) onStartBrowsing();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm transition-opacity animate-fade-in" onClick={toggleCart} />
      
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-[210] shadow-2xl transform transition-transform duration-300 ease-out overflow-hidden flex flex-col animate-slide-in-right">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            Your Cart <span className="text-gray-400 font-sans text-xs font-normal">({items.length})</span>
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-90 text-gray-400">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-full mb-4 border border-gray-100 dark:border-gray-700">
                <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Empty Cart</p>
              <button 
                onClick={handleStartBrowsing} 
                className="group relative overflow-hidden mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
              >
                {/* Blue button: Constant white shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                Browse Shop
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Items */}
              <div className="space-y-3">
                {items.map((item) => {
                  const itemOriginalPrice = item.currentPrice * item.quantity;
                  const itemDiscountedPrice = appliedCoupon 
                    ? Math.floor(itemOriginalPrice * (1 - appliedCoupon.discount / 100))
                    : itemOriginalPrice;

                  return (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 group transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-md">
                      <div className="w-20 h-12 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-xs truncate group-hover:text-blue-600 transition-colors">{item.title}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-all hover:scale-110"><Trash2 size={14} /></button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex flex-col">
                             {appliedCoupon && <span className="text-[8px] text-gray-400 line-through font-bold">₹{itemOriginalPrice}</span>}
                             <p className="font-black text-gray-900 dark:text-white text-sm">₹{itemDiscountedPrice}</p>
                          </div>
                          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-300 disabled:opacity-30 transition-all active:scale-75" disabled={item.quantity <= 1}><Minus size={12} /></button>
                            <span className="text-xs font-black w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-300 transition-all active:scale-75"><Plus size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Section */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Promotional Code</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="Paste code here..."
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className={`w-full h-11 px-4 bg-gray-50 dark:bg-white/5 border rounded-xl text-xs font-bold transition-all outline-none ${couponError ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-100 dark:border-white/10 focus:border-blue-500'}`}
                      />
                      {appliedCoupon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 animate-scale-in">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </div>
                    <button 
                      type="submit"
                      className="group relative overflow-hidden px-6 bg-gray-950 dark:bg-white text-white dark:text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      {/* Black button: Constant blue shimmer */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-x-full animate-shimmer"></div>
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-fade-in">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <Tag size={12} className="animate-bounce" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{appliedCoupon.code} Active</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">-{appliedCoupon.discount}% Off Applied</span>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tight flex items-center gap-1 animate-shake">
                      <AlertTriangle size={10} /> Invalid or Expired Code
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-1 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Cart Subtotal</span>
                <span className={`text-gray-900 dark:text-white font-bold ${appliedCoupon ? 'line-through opacity-40' : ''}`}>₹{originalTotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center text-xs text-emerald-600 font-bold">
                  <span>Deal Discount</span>
                  <span>-₹{originalTotal - total}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 text-sm">Grand Total</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">₹{total}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400 select-none leading-relaxed transition-colors group-hover:text-blue-500">
                  I accept the <button onClick={(e) => {e.preventDefault(); setShowFullTerms(true);}} className="text-blue-600 hover:underline font-bold">Terms & Conditions</button>
                </span>
              </label>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={!agreedToTerms || isProcessing}
              className={`w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 relative overflow-hidden group ${
                agreedToTerms 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:scale-[1.02] active:scale-95' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {agreedToTerms && (
                /* Blue button: Constant white shimmer */
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              )}
              {isProcessing ? 'Connecting...' : (
                <>
                  Confirm Order <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {showFullTerms && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col animate-scale-in">
             <div className="p-8 pb-4 flex justify-between items-center bg-white dark:bg-gray-900">
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-sans">PROTOCOL.</h3>
                <button onClick={() => setShowFullTerms(false)} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all hover:rotate-90"><X size={24} /></button>
             </div>
             <div className="p-8 pt-4 space-y-7 overflow-y-auto no-scrollbar max-h-[60vh]">
                <div className="space-y-6 text-[12px] font-sans font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                   <p><b>Verification:</b> Share receipt on WhatsApp to start customization.</p>
                   <p><b>Policy:</b> Digital assets are non-refundable. Offer valid until deadline.</p>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 flex gap-3 items-center">
                  <ShieldAlert className="text-amber-500 flex-shrink-0" size={16} />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-bold">
                    By clicking 'I Agree', you confirm that you have read and understood our delivery timelines and non-refundable policy.
                  </p>
                </div>
             </div>
             <div className="p-8 pt-2 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-gray-900">
                <button 
                  onClick={() => { setShowFullTerms(false); setAgreedToTerms(true); }} 
                  className="group relative overflow-hidden w-full bg-blue-600 hover:bg-blue-700 text-white py-4.5 rounded-[1.25rem] font-black text-[12px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                >
                  {/* Blue button: Constant white shimmer */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  ACCEPT & CONTINUE
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;