import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Check, Copy, Sparkles, Award, Shield, Box, Circle, Triangle, Heart, Music, Layout, Users, TrendingUp, PlayCircle, Flower2, CalendarHeart, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OfferTimer from './OfferTimer';

interface HeroProps {
  onExplore?: () => void;
  onCategorySelect?: (category: string) => void;
  onShowHowItWorks?: () => void;
  showWelcomeDiscount?: boolean;
  showOfferTimer?: boolean;
}

const PremiumDecoration = () => {
  // Generate a variety of decorative elements
  const hearts = [
    { size: 24, top: '12%', left: '18%', color: 'text-pink-500', delay: '0s', rotate: 'rotate-12' },
    { size: 32, top: '40%', left: '8%', color: 'text-rose-400', delay: '1s', rotate: '-rotate-12' },
    { size: 20, top: '65%', left: '15%', color: 'text-pink-400', delay: '2s', rotate: 'rotate-45' },
    { size: 28, top: '15%', left: '80%', color: 'text-rose-500', delay: '0.5s', rotate: '-rotate-12' },
    { size: 18, top: '55%', left: '88%', color: 'text-pink-300', delay: '1.5s', rotate: 'rotate-12' },
  ];

  const sparkles = [
    { size: 28, top: '35%', right: '10%', color: 'text-amber-400', delay: '0s' },
    { size: 20, top: '15%', right: '25%', color: 'text-blue-400', delay: '1.2s' },
    { size: 24, top: '75%', right: '20%', color: 'text-indigo-400', delay: '0.7s' },
    { size: 16, top: '25%', left: '35%', color: 'text-amber-300', delay: '2.5s' },
    { size: 22, top: '80%', left: '40%', color: 'text-blue-300', delay: '3s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Render Hearts */}
      {hearts.map((h, i) => (
        <div 
          key={`heart-${i}`}
          className={`absolute opacity-30 dark:opacity-20 animate-float-medium ${h.rotate}`}
          style={{ top: h.top, left: h.left, animationDelay: h.delay }}
        >
          <Heart size={h.size} className={`${h.color} fill-current/10`} strokeWidth={1.5} />
        </div>
      ))}

      {/* Render Sparkles */}
      {sparkles.map((s, i) => (
        <div 
          key={`sparkle-${i}`}
          className="absolute opacity-30 dark:opacity-20 animate-float-fast"
          style={{ top: s.top, right: s.right || 'auto', left: s.left || 'auto', animationDelay: s.delay }}
        >
          <Sparkles size={s.size} className={s.color} strokeWidth={1.5} />
        </div>
      ))}
      
      {/* Abstract Geometric Outlines */}
      <div className="absolute top-[40%] left-[10%] opacity-10 dark:opacity-5 animate-spin-slow">
        <Box size={40} className="text-blue-500" strokeWidth={1} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(25px) scale(1.1); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(15deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes drift-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        .animate-float-medium { animation: float-medium 10s infinite ease-in-out; }
        .animate-float-fast { animation: float-fast 8s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 40s infinite linear; }
        .animate-drift-1 { animation: drift-1 10s infinite ease-in-out; }
        .animate-drift-2 { animation: drift-2 12s infinite ease-in-out; }
      `}} />
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ onExplore, onCategorySelect, onShowHowItWorks, showWelcomeDiscount = true, showOfferTimer = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('TRYARHAM');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifiedUsers = [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4",
    "https://i.pravatar.cc/150?u=5"
  ];

  const categories = [
    { name: 'Birthday', icon: <Cake className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600', count: '2' },
    { name: 'Combo Pack', icon: <Box className="w-5 h-5" />, color: 'from-amber-400 to-orange-600', count: '0' },
    { name: 'Special', icon: <CalendarHeart className="w-5 h-5" />, color: 'from-rose-400 to-pink-600', count: '1' },
    { name: 'Valentine', icon: <Heart className="w-5 h-5" />, color: 'from-purple-500 to-violet-600', count: '0' },
    { name: 'Free', icon: <Music className="w-5 h-5" />, color: 'from-emerald-400 to-teal-600', count: '1' },
    { name: 'View All', icon: <Layout className="w-5 h-5" />, color: 'from-gray-600 to-gray-800', count: '3+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="relative pt-12 pb-12 overflow-hidden bg-[#F1F0EC] dark:bg-[#0b1120] transition-colors">
      <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <PremiumDecoration />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-24">
          
          {/* Left Column: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Top Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white dark:bg-white/5 px-1.5 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-white/5">
                <span className="bg-[#00d084] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">India's #1</span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pr-4">Premium Template Store</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-[2.5rem] sm:text-6xl md:text-[5.5rem] font-serif font-black text-[#1a1f2c] dark:text-white leading-[1.1] tracking-tight mb-6"
            >
              <span className="block whitespace-nowrap">Special Moments.</span>
              <span className="block whitespace-nowrap text-blue-600">Lifetime Magic.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 dark:text-gray-400 text-base md:text-xl font-medium max-w-[340px] md:max-w-2xl leading-relaxed mb-10 px-2 sm:px-0"
            >
              Gift a digital experience that lasts forever. High-performance templates for birthdays, anniversaries & more, starting at just <span className="text-gray-900 dark:text-white font-black">₹28</span>.
            </motion.p>

            {/* Action Buttons & Secondary Info */}
            <div className="flex flex-col items-center lg:items-start w-full">
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5 mb-8 w-full sm:w-auto">
                <button
                  onClick={onExplore}
                  className="group relative overflow-hidden w-full sm:w-auto bg-[#05070a] dark:bg-white text-white dark:text-gray-950 px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <Zap size={16} fill="currentColor" className="text-white dark:text-gray-950" />
                  Explore Templates
                </button>
                <a
                  href="https://t.me/arhambuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden w-full sm:w-auto bg-[#00d084] text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <Users size={16} className="text-white" />
                  Join Community
                </a>
              </motion.div>

              {/* HOW IT WORKS & Social Proof - Centered relative to buttons */}
              <motion.div variants={itemVariants} className="flex flex-col items-center w-full sm:w-full max-w-[460px] lg:max-w-none lg:w-[460px] lg:pl-10 gap-6">
                <div className="w-full flex justify-center">
                  <button 
                    onClick={onShowHowItWorks}
                    className="flex items-center gap-2.5 px-6 py-2.5 bg-gray-100 dark:bg-white/10 rounded-full text-[10px] font-black text-[#1a1f2c] dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-95 shadow-sm group uppercase tracking-widest"
                  >
                    HOW IT WORKS 
                    <div className="w-5 h-5 rounded-full bg-white dark:bg-white/20 flex items-center justify-center ml-1 shadow-sm">
                      <PlayCircle size={12} className="text-[#1a1f2c] dark:text-white" />
                    </div>
                  </button>
                </div>

                <div className="w-full flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {verifiedUsers.map((url, i) => (
                        <div 
                          key={i} 
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0b1120] overflow-hidden shadow-sm bg-white"
                        >
                          <img src={url} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0b1120] bg-[#1a1f2c] flex items-center justify-center text-[8px] font-black text-white shadow-sm">10+</div>
                    </div>
                    <div className="flex flex-col items-start">
                       <div className="flex gap-0.5 mb-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                       </div>
                       <span className="text-[10px] font-black text-[#1a1f2c] dark:text-white opacity-60 uppercase tracking-widest">Verified Customers</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Promo Card & Offer Timer */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-auto flex flex-col items-center gap-8"
          >
            {showOfferTimer && (
              <div className="w-full max-w-md">
                <OfferTimer />
              </div>
            )}
            {showWelcomeDiscount && (
              <div className="relative p-1 group">
                {/* Looping Dashed Border Container */}
                <div className="absolute inset-0 rounded-[3.5rem] pointer-events-none overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    <rect
                      x="2"
                      y="2"
                      width="calc(100% - 4px)"
                      height="calc(100% - 4px)"
                      rx="54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                      className="text-emerald-500/30 animate-marching-ants"
                    />
                  </svg>
                </div>
                
                <div className="w-full max-w-sm bg-white dark:bg-[#111827] rounded-[3rem] p-10 shadow-xl relative flex flex-col items-center text-center">
                   <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
                     Welcome Discount
                   </div>
                   
                   <div className="text-6xl font-black text-[#1a1f2c] dark:text-white mb-2 tracking-tighter">5% OFF</div>
                   <div className="text-xl font-bold text-[#1a1f2c] dark:text-white mb-2 tracking-tight">On Your Any Order</div>
                   <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">Apply at checkout for instant savings</p>
                   
                   <div 
                     onClick={handleCopy}
                     className="w-full bg-[#0b1120] p-5 rounded-2xl flex items-center justify-between cursor-pointer group/code transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                   >
                      <div className="flex flex-col items-start">
                         <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Promo Code</span>
                         <span className="text-base font-black text-white tracking-widest uppercase">TRYARHAM</span>
                      </div>
                      
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="text-emerald-500"
                            >
                              <Check size={20} strokeWidth={3} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="text-gray-400 group-hover/code:text-white transition-colors"
                            >
                              <Copy size={20} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Browse Categories Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-gray-200 dark:bg-white/10"></div>
              Browse Categories
              <div className="h-px w-8 bg-gray-200 dark:bg-white/10"></div>
            </h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                onClick={() => {
                  if (onCategorySelect) {
                    const filterName = cat.name === 'View All' ? 'All Products' : cat.name;
                    onCategorySelect(filterName);
                  }
                }}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg transition-all group-hover:shadow-2xl group-hover:scale-110 relative`}>
                  {cat.icon}
                  <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-gray-100 dark:border-white/10 shadow-sm text-gray-500">
                    {cat.count}
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes marching-ants {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -16; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-marching-ants {
          animation: marching-ants 1s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;