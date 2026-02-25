import React, { useState, useEffect } from 'react';
import { 
  Download, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ClipboardEdit,
  Check,
  ArrowLeft,
  Heart,
  Smartphone,
  Activity,
  FileText,
  Share2,
  Package,
  CheckCircle2,
  ShieldAlert,
  Lock,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DeliveryProcessProps {
  onBack?: () => void;
  items?: any[];
}

const DeliveryProcess: React.FC<DeliveryProcessProps> = ({ onBack, items = [] }) => {
  const [showCelebration, setShowCelebration] = useState(true);
  const [orderId] = useState(() => `ARHAM-${Math.floor(1000 + Math.random() * 9000)}-${['X', 'Y', 'Z'][Math.floor(Math.random() * 3)]}`);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0);
  const email = "arhamadib31@gmail.com";
  const firstItemName = items.length > 0 ? items[0].title : "Template Asset";
  const subject = encodeURIComponent(`Order Confirmation: ${orderId}`);
  const body = encodeURIComponent(`Hi Arham!\n\nI just bought the "${firstItemName}" template (Order ID: ${orderId}). I'm ready to provide my photos/text for customization!`);
  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowCelebration(false), 4000);
    const revealTimer = setTimeout(() => setIsVisible(true), 50);
    const progressTimer = setInterval(() => {
      setProgress(prev => (prev < 92 ? prev + Math.random() * 5 : prev));
    }, 800);
    return () => {
      clearTimeout(timer);
      clearTimeout(revealTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleShare = async () => {
    const shareText = `Order Confirmed! 🚀\nID: ${orderId}\nTemplate: ${firstItemName}\n\nGet your special template at: https://arhambuilds.in`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Arham Builds Order Confirmation',
          text: shareText,
          url: window.location.origin
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Order details copied to clipboard!");
      }
    } catch (err) {
      console.log('Share failed', err);
    }
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
========================================
    ARHAM BUILDS OFFICIAL RECEIPT
========================================
ORDER ID   : ${orderId}
DATE       : ${new Date().toLocaleDateString()}
TIME       : ${new Date().toLocaleTimeString()}
STATUS     : PAYMENT SUCCESSFUL
----------------------------------------
PURCHASE SUMMARY:
${items.map(item => `- ${item.title} x${item.quantity || 1} [₹${item.currentPrice}]`).join('\n')}

TOTAL PAID : ₹${totalPrice}
----------------------------------------
NEXT STEPS FOR CUSTOMIZATION:
1. Email Arham at ${email}
2. Provide Order ID: ${orderId}
3. Submit your photos, text, and music

VERIFICATION PROTOCOL:
Deployment starts immediately after form submission.
========================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt-${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const steps = [
    { id: 1, title: "Email Verify", icon: <Mail className="text-emerald-500" size={14} /> },
    { id: 2, title: "Submit Form", icon: <ClipboardEdit className="text-blue-500" size={14} /> },
    { id: 3, title: "Live Link", icon: <Clock className="text-purple-500" size={14} /> }
  ];

  return (
    <div className="min-h-screen py-4 md:py-8 px-4 bg-[#F1F0EC] dark:bg-[#0b1120] flex flex-col items-center justify-start overflow-x-hidden no-scrollbar transition-colors">
      
      {showCelebration && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-confetti-pop opacity-0"
              style={{
                width: '6px', height: '6px',
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'][i % 4],
                borderRadius: i % 2 === 0 ? '50%' : '2px',
                '--tx': `${(Math.random() - 0.5) * 80}vw`,
                '--ty': `${(Math.random() - 0.5) * 80}vh`,
                animationDuration: '1.5s'
              } as any}
            />
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10 flex flex-col gap-4"
      >
        <div className="flex justify-between items-center px-1">
          <button onClick={onBack} className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all active:scale-90">
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Store</span>
          </button>
          <div className="flex items-center gap-2 bg-white dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">ID: {orderId}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col">
          
          <div className="p-6 text-center bg-gray-50/50 dark:bg-gray-800/10 border-b border-gray-100 dark:border-white/5 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
              <div className="h-full bg-blue-600 transition-all duration-[1.5s] ease-out" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-[-8px] bg-emerald-500/20 rounded-full animate-ping-slow"></div>
                <div className="relative w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
                  <CheckCircle2 size={28} className="text-white stroke-[3px]" />
                </div>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">Success!</h1>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] font-medium tracking-tight">Your digital gift is being prepared.</p>
          </div>

          <div className="p-5 md:p-6 space-y-6">
            <div className="p-4 bg-blue-600/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
               <div className="p-2 bg-blue-600 rounded-lg text-white shrink-0">
                  <ShieldCheck size={16} />
               </div>
               <div>
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Authenticity Confirmed</h4>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                     Order ID <b>{orderId}</b> is now active in our registry. Please share this via Email to start customization.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleDownloadReceipt}
                className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-all active:scale-95"
              >
                <Download size={14} strokeWidth={3} />
                Receipt
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:bg-gray-100 transition-all active:scale-95"
              >
                <Share2 size={14} strokeWidth={3} />
                Share
              </button>
            </div>

            <div className="p-4 bg-gray-50/50 dark:bg-white/[0.02] rounded-2xl border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 mb-3">
                 <Package size={12} className="text-gray-400" />
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Order Summary</span>
              </div>
              <div className="space-y-2">
                 {items.length > 0 ? items.map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-[11px] font-bold text-gray-700 dark:text-gray-300">
                      <span className="truncate max-w-[180px]">{item.title}</span>
                      <span className="text-gray-400">₹{item.currentPrice}</span>
                   </div>
                 )) : (
                   <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 dark:text-gray-300">
                      <span>Premium Template</span>
                      <span className="text-gray-400">Verified</span>
                   </div>
                 )}
                 <div className="pt-2 mt-2 border-t border-gray-100 dark:border-white/5 flex justify-between items-center font-black">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Total Amount</span>
                    <span className="text-blue-600 dark:text-blue-400">₹{totalPrice || '0'}</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 px-1">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-1.5 opacity-60">
                   <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm">
                      {step.icon}
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 pb-2">
              <a 
                href={mailtoUrl}
                className="group relative overflow-hidden flex items-center justify-center gap-3 w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-blue-600/30 active:scale-95 transition-all"
              >
                {/* Blue button: Constant slow white shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                <Mail size={18} className="fill-white/10" />
                Customize Template
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
              <div className="mt-5 flex items-center justify-center gap-2 opacity-30 select-none">
                 <ShieldCheck size={10} />
                 <span className="text-[8px] font-black uppercase tracking-widest">Secure Moment Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryProcess;