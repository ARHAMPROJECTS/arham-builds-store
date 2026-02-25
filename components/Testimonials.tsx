import React from 'react';
import { MessageCircle } from 'lucide-react';

const DARK_ROW1 = [
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
];

const DARK_ROW2 = [
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
  'https://ik.imagekit.io/anujbuilds/testimonials/ss3.webp?updatedAt=1762532041953',
];

const LIGHT_ROW1 = [
  'https://files.catbox.moe/klh3v2.png',
  'https://files.catbox.moe/klh3v2.png',
  'https://files.catbox.moe/klh3v2.png',
  'https://files.catbox.moe/ldwhr6.png',
  'https://files.catbox.moe/ldwhr6.png',
];

const LIGHT_ROW2 = [
  'https://files.catbox.moe/ldwhr6.png',
  'https://files.catbox.moe/klh3v2.png',
  'https://files.catbox.moe/ldwhr6.png',
  'https://files.catbox.moe/ldwhr6.png',
  'https://files.catbox.moe/ldwhr6.png',
];

const Testimonials: React.FC = () => {
  // Use CSS classes to handle visibility for seamless theme switching in marquee
  const duplicatedLight1 = [...LIGHT_ROW1, ...LIGHT_ROW1, ...LIGHT_ROW1];
  const duplicatedLight2 = [...LIGHT_ROW2, ...LIGHT_ROW2, ...LIGHT_ROW2];
  const duplicatedDark1 = [...DARK_ROW1, ...DARK_ROW1, ...DARK_ROW1];
  const duplicatedDark2 = [...DARK_ROW2, ...DARK_ROW2, ...DARK_ROW2];

  return (
    <div className="py-20 bg-transparent transition-colors overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
             <MessageCircle size={16} className="text-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">What Customers Say</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1a1f2c] dark:text-white tracking-tighter mb-4">
            Trusted by <span className="text-blue-600 italic">Tens</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        {/* Row 1: Slides Left */}
        <div className="group flex overflow-hidden py-2 select-none">
          <div className="flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused]">
            {/* Light Mode Images */}
            {duplicatedLight1.map((src, i) => (
              <div 
                key={`light-row1-${i}`} 
                className="dark:hidden flex-shrink-0 w-[280px] md:w-[400px] aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <img 
                  src={src} 
                  alt={`Review Light Row 1 ${i}`} 
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            {/* Dark Mode Images */}
            {duplicatedDark1.map((src, i) => (
              <div 
                key={`dark-row1-${i}`} 
                className="hidden dark:block flex-shrink-0 w-[280px] md:w-[400px] aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 shadow-lg bg-[#111827] transition-transform duration-300 hover:scale-[1.02]"
              >
                <img 
                  src={src} 
                  alt={`Review Dark Row 1 ${i}`} 
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Slides Right */}
        <div className="group flex overflow-hidden py-2 select-none">
          <div className="flex gap-6 animate-marquee-right group-hover:[animation-play-state:paused]">
            {/* Light Mode Images */}
            {duplicatedLight2.map((src, i) => (
              <div 
                key={`light-row2-${i}`} 
                className="dark:hidden flex-shrink-0 w-[280px] md:w-[400px] aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <img 
                  src={src} 
                  alt={`Review Light Row 2 ${i}`} 
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            {/* Dark Mode Images */}
            {duplicatedDark2.map((src, i) => (
              <div 
                key={`dark-row2-${i}`} 
                className="hidden dark:block flex-shrink-0 w-[280px] md:w-[400px] aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 shadow-lg bg-[#111827] transition-transform duration-300 hover:scale-[1.02]"
              >
                <img 
                  src={src} 
                  alt={`Review Dark Row 2 ${i}`} 
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gradient Overlays for Fade Effect */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-60 bg-gradient-to-r from-[#F1F0EC] dark:from-[#0b1120] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 md:w-60 bg-gradient-to-l from-[#F1F0EC] dark:from-[#0b1120] to-transparent z-20 pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Testimonials;