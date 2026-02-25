
import React, { useState } from 'react';
import { Zap, X, Copy, Check, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

const HotDealsSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { appliedCoupon } = useCart();

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

  const deals = [
    { code: 'AAHAM28', desc: '10% OFF on Birthday Templates', discount: '10%' },
    { code: 'TRYARHAM', desc: 'Flat 5% OFF on Any Order', discount: '5%' }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      {/* Floating Tab */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[150] cursor-pointer group"
      >
        <div className="bg-gray-950 dark:bg-blue-600 text-white py-6 px-3 rounded-l-2xl shadow-2xl flex flex-col items-center gap-2 transform hover:-translate-x-1 transition-all border-y border-l border-white/10">
           <div className="relative">
             <Zap size={14} fill="currentColor" className="animate-pulse" />
             {appliedCoupon && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-black shadow-sm"></div>
             )}
           </div>
           <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.4em] rotate-180">
             {appliedCoupon ? 'Active Deal' : 'Hot Deals'}
           </span>
        </div>
      </div>

      {/* Slide-out Panel */}
      <div className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        
        <div className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white dark:bg-[#0b1120] shadow-2xl transform transition-transform duration-500 ease-out border-l border-white/5 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <Gift size={18} className="text-blue-600" />
                 <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Deal Center</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
                 <X size={18} />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              <div className="bg-blue-600/5 border border-blue-600/10 p-4 rounded-2xl mb-2">
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">How it works</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Click to copy a code and paste it in your Checkout to unlock the discount.</p>
              </div>

              {deals.map((deal) => {
                const isCopied = copiedCode === deal.code;
                return (
                  <div 
                    key={deal.code} 
                    onClick={() => handleCopy(deal.code)}
                    className="p-4 rounded-2xl border bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 hover:border-blue-500/20 transition-all group cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{deal.discount} Discount</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-900 dark:text-white mb-4 leading-snug">{deal.desc}</p>
                    
                    <button 
                      className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-sm border ${
                        isCopied 
                        ? 'bg-blue-600 dark:bg-white text-white dark:text-gray-950 border-transparent shadow-inner' 
                        : 'bg-gray-950 dark:bg-blue-600 text-white border-transparent hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      {isCopied ? (
                        <>COPIED <Check size={12} /></>
                      ) : (
                        <><Copy size={12} /> {deal.code}</>
                      )}
                    </button>
                  </div>
                );
              })}
           </div>

           <div className="p-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2 text-amber-500">
                <Zap size={12} fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-widest">Flash Notice</span>
              </div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                Offers are valid permanently with no expiry date. Only one coupon can be used per order. Multiple coupons cannot be combined in a single order.
              </p>
           </div>
        </div>
      </div>
    </>
  );
};

export default HotDealsSidebar;
