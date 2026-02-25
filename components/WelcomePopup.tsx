import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomePopupProps {
  onClose?: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true');
    if (onClose) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300
            }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px] md:h-[500px]"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 md:bg-transparent md:hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-48 md:h-auto relative overflow-hidden">
              <picture className="w-full h-full">
                <source media="(min-width: 768px)" srcSet="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEicRnCqWugUSaC7DRGWloQOLl1OX-cNsfUya8RnPQuV2MasYUc5d9LhaCOUm88wXXythLrYMVkSvJc2esxvJdUWqPJCjml4ENG-JIq1-NT_qV6Y32-BcD0QKxQNjoEOLW_ertuX1hIRgwpAoPymsciT_2moeajnZ_e1N7MXAFSwUgFhMQbUVxdQH4bQ/s320/Blogger-Logo-16x9.web" />
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEicRnCqWugUSaC7DRGWloQOLl1OX-cNsfUya8RnPQuV2MasYUc5d9LhaCOUm88wXXythLrYMVkSvJc2esxvJdUWqPJCjml4ENG-JIq1-NT_qV6Y32-BcD0QKxQNjoEOLW_ertuX1hIRgwpAoPymsciT_2moeajnZ_e1N7MXAFSwUgFhMQbUVxdQH4bQ/s320/Blogger-Logo-16x9.webp" 
                  alt="Special Offer" 
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            </div>

            {/* Right Side: Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center text-center md:text-left md:items-start bg-white dark:bg-gray-900">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                        Unlock <span className="text-blue-600">15% OFF</span> on your next order
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                        And gain access to exclusive sales, premium templates, and more.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                          <Mail size={18} />
                        </div>
                        <input 
                          type="email" 
                          required
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white font-medium transition-all"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative overflow-hidden w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Get discount code
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>

                    <button 
                      onClick={handleClose}
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors w-full md:w-auto"
                    >
                      Maybe later
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                      <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-gray-900 dark:text-white">Check your inbox!</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                      We've sent your 15% discount code to <span className="text-blue-600 font-bold">{email}</span>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
