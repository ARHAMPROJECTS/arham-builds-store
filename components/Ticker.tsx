
import React, { useState, useEffect } from 'react';

const ANNOUNCEMENTS = [
  "🎉 New Year Offer: Buy 2 Templates at the Price of 1! 🎉",
  "🚀 Get a fully deployed site within 3 hours! 🚀",
  "✨ Premium Quality • Lightning Fast Delivery ✨"
];

const Ticker: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length);
        setIsFading(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 flex justify-center py-3 px-4 transition-colors">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative flex items-center justify-center bg-red-600 dark:bg-red-500 px-6 py-2 rounded-full shadow-lg shadow-red-600/20 border border-red-500 dark:border-red-400">
          <div 
            className={`transition-all duration-500 flex items-center justify-center text-center ${
              isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <span className="text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase leading-tight select-none">
              {ANNOUNCEMENTS[index]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
