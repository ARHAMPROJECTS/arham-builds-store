
import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const couponCode = "TRYARHAM";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 100,
              mass: 0.8
            }}
            className="relative w-full max-w-[800px] max-h-[90vh] bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all bg-white/80 dark:bg-black/20 rounded-full backdrop-blur-sm"
            >
              <X size={24} />
            </button>

            {/* Left Side: Full-Bleed Offer Poster */}
            <div className="w-full md:w-[50%] relative bg-[#0a0a0a] flex items-center justify-center overflow-hidden h-48 sm:h-64 md:h-auto shrink-0">
              <picture className="w-full h-full">
                <source media="(min-width: 768px)" srcSet="https://cdn.dotpe.in/longtail/store-items/9169185/frG3Ro4t.webp" />
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEicRnCqWugUSaC7DRGWloQOLl1OX-cNsfUya8RnPQuV2MasYUc5d9LhaCOUm88wXXythLrYMVkSvJc2esxvJdUWqPJCjml4ENG-JIq1-NT_qV6Y32-BcD0QKxQNjoEOLW_ertuX1hIRgwpAoPymsciT_2moeajnZ_e1N7MXAFSwUgFhMQbUVxdQH4bQ/s320/Blogger-Logo-16x9.webp" 
                  alt="Special Offer Poster" 
                  className="w-full h-full object-contain md:object-cover"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>

            {/* Right Side: Offer Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full md:w-[50%] p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white dark:bg-[#0f172a] overflow-y-auto"
            >
              {/* Logo Image */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="mb-4 sm:mb-6"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-black/20">
                   <img 
                     src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXQyElpJdVaCX2-Xb0bIBB0MtngoRDnqlh8yRWQI2QY2UOwAi403nAPwtBhn-3hyumBHIZ0v621lbiXNQVwMOEuq_wDIGQRjKJtQGKRb6AbTBjnKpjwl62eQ00dA5JZRJmr7EQwhsYH_RyGjqw3K5_KfwqrerU0PN9PXGd8IAe4qokPMa0mf9oQlZcOQ/s320/ArhamAvtar.jpeg"
                     alt="Logo" 
                     className="w-full h-full object-cover"
                     referrerPolicy="no-referrer"
                   />
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-1 sm:mb-2"
              >
                Don't go away, here's a surprise!
              </motion.p>

              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 sm:mb-4"
              >
                GET 5% OFF
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8"
              >
                Minimum order value ₹50, Maximum discount ₹40
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full space-y-3 sm:space-y-4"
              >
                <div className="w-full py-3 sm:py-4 border-2 border-dashed border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 rounded-md text-lg sm:text-xl font-mono tracking-widest text-blue-700 dark:text-blue-300 font-bold">
                  {couponCode}
                </div>

                <button 
                  onClick={handleCopy}
                  className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-[0.98]"
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      Copied!
                    </>
                  ) : (
                    <>
                      Copy code
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
