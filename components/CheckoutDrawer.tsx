import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, AlertTriangle, FileText, CheckCircle2, CreditCard, Calendar, Zap, Info, ShieldCheck, Tag, MinusCircle, User, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CheckoutDrawerProps {
  product: Product | null;
  onClose: () => void;
  onSuccess?: () => void;
}

// Global available coupons
const GLOBAL_COUPONS: Record<string, number> = {
  'MOMENT10': 10,
  'ARHAMBUILD10': 10,
  'TRYARHAM': 5
};

const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ product, onClose, onSuccess }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState(false);

  // Reset coupon state whenever the drawer closes or product changes
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    if (!product) {
      const timer = setTimeout(() => {
        setAppliedDiscount(0);
        setAppliedCode(null);
        setCouponInput('');
        setCouponError(false);
        setAgreedToTerms(false);
      }, 0);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
      };
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const handleApplyCoupon = (e?: React.FormEvent, directCode?: string) => {
    e?.preventDefault();
    const code = (directCode || couponInput).trim().toUpperCase();
    const discount = GLOBAL_COUPONS[code];
    
    if (discount) {
      setAppliedDiscount(discount);
      setAppliedCode(code);
      setCouponError(false);
      setCouponInput('');
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    }
  };

  const removeCoupon = () => {
    setAppliedDiscount(0);
    setAppliedCode(null);
    setCouponInput('');
  };

  const handleClose = () => {
    // Clear all states before closing
    setAppliedDiscount(0);
    setAppliedCode(null);
    setCouponInput('');
    setCouponError(false);
    setAgreedToTerms(false);
    onClose();
  };

  // Price Calculations
  const originalPrice = product.originalPrice || product.currentPrice;
  const storeDiscount = originalPrice - product.currentPrice;
  const couponDiscountAmount = Math.floor(product.currentPrice * (appliedDiscount / 100));
  const finalPrice = product.currentPrice - couponDiscountAmount;

  const handleFinalCheckout = () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions before proceeding to payment.");
      return;
    }

    if (!(window as any).Razorpay) {
      alert("Payment gateway is loading. Please try again.");
      return;
    }
    
    const options = {
      key: "rzp_live_SL7gv4559mguxV",
      amount: finalPrice * 100,
      currency: "INR",
      name: "Arham Builds",
      description: `${product.title} ${appliedCode ? `(Code: ${appliedCode})` : ''}`,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGerWLzMB6sist_c1s9aQZ-18JCIOAuOzllZ0-Hx5gdjyJ4xiaoW4ItlvmDYzLmQaich3erS_p2rf3cmQCla-UZw0Gf2DGnzvFPUKVBj0njTizv5I9zqO6UK1db9tEQkx6pKil3umTOwqwZpmPf5R0dFXxqUxtUQ3I_pQ6om9DBuRhfhIKiMmu3aPcDNk/s820/cropped_circle_image%20(3)%20(1)%20(2)%20(1).png",
      handler: function (_response: unknown) {
        if (onSuccess) onSuccess();
        handleClose();
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#2563eb" },
      modal: { ondismiss: () => {} }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm transition-opacity animate-fade-in touch-none"
        onClick={handleClose}
      />
      
      <div className="fixed top-0 right-0 h-[100dvh] w-full md:inset-0 md:m-auto md:h-fit md:max-h-[90vh] md:max-w-3xl md:rounded-[2.5rem] bg-white dark:bg-gray-900 z-[210] shadow-2xl transform transition-all duration-300 ease-out overflow-hidden flex flex-col animate-slide-in-right-smooth md:animate-fade-in-smooth touch-none">
        
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 flex-shrink-0">
            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Checkout
            </h2>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-90 text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-5 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 touch-auto">
            
            {/* LEFT COLUMN: Product, Coupons, Delivery */}
            <div className="space-y-4">
              {/* Product Header */}
              <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-12 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <img src={product.thumbnailUrl} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h3 className="font-black text-gray-900 dark:text-white text-xs leading-tight mb-0.5 truncate">{product.title}</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.category} Asset</p>
                </div>
              </div>

              {/* Available Coupons - Compact & Click to Apply */}
              {!appliedCode && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 px-1">
                    <Tag size={12} className="text-blue-500" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Coupons</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(GLOBAL_COUPONS).map(code => (
                      <button 
                        key={code} 
                        onClick={() => handleApplyCoupon(undefined, code)}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95"
                      >
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{code}</span>
                        <Zap size={10} className="text-blue-500 fill-blue-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupon Input Area */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coupon</h4>
                  {appliedCode && (
                    <button 
                      onClick={removeCoupon}
                      className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <MinusCircle size={10} /> Remove Applied
                    </button>
                  )}
                </div>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder={appliedCode ? appliedCode : "Paste code here..."}
                      value={appliedCode ? appliedCode : couponInput}
                      readOnly={!!appliedCode}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className={`w-full h-11 px-4 bg-gray-50 dark:bg-white/5 border rounded-xl text-xs font-bold transition-all outline-none ${
                        appliedCode 
                          ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' 
                          : couponError ? 'border-red-500 bg-red-50' : 'border-gray-100 dark:border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {appliedCode && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 animate-scale-in">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </div>
                  {!appliedCode && (
                    <button 
                      type="submit"
                      className="group relative overflow-hidden px-6 bg-gray-950 dark:bg-white text-white dark:text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-x-full animate-shimmer"></div>
                      Apply
                    </button>
                  )}
                </form>
                
                {couponError && (
                  <p className="text-[9px] text-red-500 font-bold uppercase tracking-tight flex items-center gap-1 px-1">
                    <AlertTriangle size={10} /> Invalid Code
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20 text-center">
                  <Zap size={16} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-[9px] font-black uppercase text-gray-400">Delivery</p>
                  <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200">12-24 Hours</p>
                </div>
                <div className="p-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl border border-purple-100/50 dark:border-purple-900/20 text-center">
                  <Calendar size={16} className="text-purple-500 mx-auto mb-1" />
                  <p className="text-[9px] font-black uppercase text-gray-400">Validity</p>
                  <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200">2 Months</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Price Summary */}
            <div className="space-y-4">
              {/* Order Summary with Detailed Price Breakdown */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Detailed Summary</h4>
                <div className="bg-gray-50 dark:bg-gray-800/20 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Original Value</span>
                    <span className="text-gray-900 dark:text-white font-bold">₹{originalPrice}</span>
                  </div>
                  
                  {storeDiscount > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Inventory Sale Discount</span>
                      <span className="text-emerald-600 font-bold">-₹{storeDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-gray-900 dark:text-white font-black uppercase tracking-tighter">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-black">₹{product.currentPrice}</span>
                  </div>

                  {appliedCode && (
                    <div className="flex justify-between items-center text-xs animate-fade-in pt-1">
                      <span className="text-blue-600 font-black uppercase tracking-tighter flex items-center gap-1.5">
                        <Tag size={12} /> Promo: {appliedCode} (-{appliedDiscount}%)
                      </span>
                      <span className="text-blue-600 font-black">-₹{couponDiscountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-gray-900 dark:text-white font-black uppercase tracking-tighter">Grand Total</span>
                    <span className="text-gray-900 dark:text-white font-black">₹{finalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grand Total Footer */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Payable Amount</span>
              <div className="text-right">
                {(storeDiscount > 0 || couponDiscountAmount > 0) && (
                  <p className="text-[9px] text-emerald-600 font-black uppercase tracking-tight mb-0.5">Saved ₹{storeDiscount + couponDiscountAmount}</p>
                )}
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">₹{finalPrice}</span>
              </div>
            </div>

            <div className="mb-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 transition-all"
                />
                <span className="text-[10px] text-gray-500 dark:text-gray-400 select-none leading-relaxed font-medium">
                  I accept the <button onClick={(e) => {e.preventDefault(); setShowFullTerms(true);}} className="text-blue-600 hover:underline font-black">Terms & Conditions</button>
                </span>
              </label>
            </div>

            <button 
              onClick={handleFinalCheckout}
              className={`group relative overflow-hidden w-full py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                agreedToTerms 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 active:scale-95' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {agreedToTerms && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              )}
              Confirm & Pay Securely
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.12em] text-gray-400 select-none">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={10} className="text-emerald-500" />
                Verified Merchant
              </span>
              <span className="text-gray-200 dark:text-gray-800">•</span>
              <div className="flex items-center gap-0.5">
                <ShieldCheck size={10} className="text-emerald-500 mr-0.5" />
                <span className="mr-1">Secured by</span>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                  alt="Razorpay" 
                  className="h-[10px] w-auto object-contain dark:brightness-150 grayscale hover:grayscale-0 transition-all opacity-80" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

       {showFullTerms && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90dvh] animate-scale-in">
             
             {/* Modal Header */}
             <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 flex-shrink-0">
                <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Store Policies
                </h3>
                <button 
                  onClick={() => setShowFullTerms(false)} 
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
             </div>
             
             {/* Modal Content - Scrollable */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6 touch-auto no-scrollbar">
                
                {/* How It Works Section */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-600"><Info size={14} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">How It Works</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    Our process is streamlined for speed. Once purchased, you are provided with a dedicated form to submit your details (photos, text, preferences). Our team then manually crafts and deploys your personalized website.
                  </p>
                </section>

                {/* Privacy & Data Section */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md text-green-600"><ShieldCheck size={14} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Privacy & Data</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    Absolutely. We use your photos and text only for the purpose of creating your requested website. Once the validity period ends and the site is taken down, all personal assets associated with that project are securely deleted from our active deployment servers.
                  </p>
                </section>

                {/* Delivery Process Section */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-600"><Zap size={14} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Delivery Process</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-3 items-start">
                      <span className="text-[10px] font-bold text-blue-500 mt-0.5">01</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Send your payment receipt via WhatsApp or Telegram for immediate verification.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-[10px] font-bold text-blue-500 mt-0.5">02</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Complete the customization form. The 24-hour delivery timer starts <b>after</b> this submission.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-[10px] font-bold text-blue-500 mt-0.5">02</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Receive your live URL and QR code directly in your email/chat.</p>
                    </div>
                  </div>
                </section>

                {/* Refund & Cancellation Section */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-md text-red-600"><ShieldAlert size={14} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Refund & Cancellation</h4>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-1 leading-relaxed font-medium">
                    <li>As these are digital assets, <b>all sales are final</b>. No refunds will be issued.</li>
                    <li>Orders cannot be cancelled once the payment is confirmed.</li>
                    <li>We offer a 100% money-back guarantee <b>only</b> if we fail to deliver within 24 hours of form submission.</li>
                  </ul>
                </section>

                {/* Validity Section */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md text-purple-600"><Calendar size={14} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Website Validity</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    Your website will remain active and hosted for <b>2 months</b>. For extensions or permanent hosting, please contact us at arhamadib31@gmail.com before your link expires.
                  </p>
                </section>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 flex gap-3">
                  <ShieldAlert className="text-amber-500 flex-shrink-0" size={16} />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-bold">
                    By clicking 'I Agree', you confirm that you have read and understood our delivery timelines and non-refundable policy.
                  </p>
                </div>
             </div>

             {/* Modal Footer */}
             <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
                <button 
                  onClick={() => { setShowFullTerms(false); setAgreedToTerms(true); }} 
                  className="group relative overflow-hidden w-full bg-gray-950 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
                >
                  {/* Dark background modal button: Constant blue shimmer */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-x-full animate-shimmer"></div>
                  I Understand & Agree
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutDrawer;
