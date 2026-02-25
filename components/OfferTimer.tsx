//
import React, { useState, useEffect } from 'react';
import { Zap, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const OfferTimer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    isExpired: false
  });

  useEffect(() => {
    // Target: 17th February 2026, 11:59 PM
    const targetDate = new Date('February 28, 2026 23:59:59').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isExpired) {
    return (
      <div className="mb-8">
        <div className="bg-white dark:bg-[#111827] rounded-[3rem] border border-gray-100 dark:border-white/5 p-8 text-center shadow-xl">
           <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Season Offer Ended</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white dark:bg-[#111827] rounded-[3rem] border border-gray-100 dark:border-white/5 p-6 md:p-8 text-center shadow-xl"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 shadow-lg">
          <Zap size={10} fill="currentColor" /> Offer Ends Feb 28
        </div>
        
        <h2 className="text-xl md:text-2xl font-serif font-black text-[#1a1f2c] dark:text-white mb-6 tracking-tight leading-tight">
          Unlock Premium Templates
        </h2>

        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Mins', val: timeLeft.mins },
            { label: 'Secs', val: timeLeft.secs }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-[1rem] md:rounded-[1.25rem] flex items-center justify-center text-lg md:text-2xl font-black shadow-lg shadow-blue-600/20 mb-2 transition-transform hover:scale-105">
                {String(item.val).padStart(2, '0')}
              </div>
              <span className="text-[7px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="max-w-xs mx-auto space-y-4">
           <div>
              <p className="text-[#00d084] text-xs font-black uppercase tracking-widest mb-1">Flash Sale Live!</p>
              <p className="text-gray-400 text-[10px] font-medium uppercase tracking-tight">Copy any code from "Hot Deals" sidebar</p>
           </div>
           
           <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl flex items-center justify-between border border-gray-200 dark:border-white/5 group hover:border-blue-500/30 transition-all">
              <span className="text-sm font-black text-gray-900 dark:text-white tracking-widest pl-2">MOMENT10</span>
              <button 
                onClick={() => {
                   navigator.clipboard.writeText('MOMENT10');
                   setCopied(true);
                   setTimeout(() => setCopied(false), 2000);
                }}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all flex items-center gap-2 ${
                  copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-blue-600 text-white'
                }`}
              >
                {copied ? (
                  <>COPIED <Check size={12} /></>
                ) : (
                  <>COPY <Copy size={12} /></>
                )}
              </button>
           </div>
           
           <p className="text-gray-400 text-[9px] font-medium">Valid until Feb 17, 2026 • 11:59 PM</p>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferTimer;
//