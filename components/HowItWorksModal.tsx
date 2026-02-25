import React, { useEffect } from 'react';
import { X, ShoppingBag, MessageCircle, Globe, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Prevent scrolling on mobile devices strictly
      const preventDefault = (e: TouchEvent) => e.preventDefault();
      document.addEventListener('touchmove', preventDefault, { passive: false });
      return () => {
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
        document.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-white/40 dark:bg-black/40 backdrop-blur-[32px] animate-fade-in touch-none overflow-hidden h-[100dvh]">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white dark:border-gray-800 overflow-hidden flex flex-col animate-scale-in max-h-[92dvh]">
         
         {/* Protocol Header - Fixed height, No Scroll */}
         <div className="p-7 pb-4 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight font-sans leading-none">How we Works</h3>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Start your premium journey in 3 steps</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all active:scale-90"><X size={24} /></button>
         </div>
         
         {/* Content Area - Compacted for Zero Scrolling */}
         <div className="flex-1 p-7 pt-2 space-y-5 overflow-hidden touch-none">
            
            <section className="space-y-1.5 group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 flex-shrink-0 transition-transform group-hover:scale-110">
                  <ShoppingBag size={14} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">01. PROCUREMENT</h4>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug font-medium pl-8">
                Pick your template and complete checkout via Razorpay. Your Order ID is registered instantly.
              </p>
            </section>

            <section className="space-y-1.5 group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 flex-shrink-0 transition-transform group-hover:scale-110">
                  <MessageCircle size={14} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">02. CUSTOMIZATION</h4>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug font-medium pl-8">
                Message us on WhatsApp. We provide a secure dashboard link to upload your photos and text assets.
              </p>
            </section>

            <section className="space-y-1.5 group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 flex-shrink-0 transition-transform group-hover:scale-110">
                  <Globe size={14} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">03. LIVE DEPLOY</h4>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug font-medium pl-8">
                Our team architecturally builds and deploys your site within 12-24 hours with a unique URL.
              </p>
            </section>

            <div className="p-4 bg-blue-600/5 rounded-2xl border border-blue-600/10 flex gap-3 animate-pulse-slow">
              <CheckCircle2 className="text-blue-500 flex-shrink-0" size={18} />
              <p className="text-[10px] text-blue-600 dark:text-blue-400 leading-tight font-bold">
                Delivery guarantee starts instantly after form submission. Priority support is active 24/7.
              </p>
            </div>
         </div>

         {/* Footer Section - Button matches "VIEW" button style */}
         <div className="p-7 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-gray-900 flex-shrink-0">
            <button 
              onClick={onClose} 
              className="group relative overflow-hidden w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 uppercase tracking-[0.1em] text-xs"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
              TAKE EXPERIENCE
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default HowItWorksModal;