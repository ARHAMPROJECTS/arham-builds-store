import React from 'react';
import { View } from '../App';
import { Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

const FooterDecoration = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
    <div className="absolute top-[5%] left-[15%] animate-float-slow">
      <Heart size={14} className="text-pink-500/20 fill-current" />
    </div>
    <div className="absolute bottom-[10%] right-[15%] animate-float-medium">
      <Sparkles size={12} className="text-blue-500/20" />
    </div>
  </div>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, v: View) => {
    e.preventDefault();
    onNavigate?.(v);
  };

  return (
    <footer className="relative bg-transparent pt-10 pb-6 transition-colors border-t border-gray-200/50 dark:border-white/5 overflow-hidden">
      <FooterDecoration />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Brand Section */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-3 mb-1.5">
             <img 
               src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_k4CqxRUYByW2SZXhkby2AxlfiQFsW6jm-KFzlA__1go2Lmu1AxA8hgyXDpEHwxyeBCRbpelQeIJnBfwPCzEhOeXxEUmoCiogiJxr-MwMahQymXwnoy5peuHdUGNlPAXXFzgtx4R3udF4oV20QdEFrfki71UE59XvuI5RDeGk26MkdNlRFMiz6nzqTw/s320/ArhamBuildsLogo.png" 
               alt="Arham Builds Logo" 
               className="w-8 h-8 object-contain"
             />
             <h2 className="text-lg md:text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                ARHAM <span className="text-blue-600">BUILDS.</span>
             </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[11px] md:text-xs font-medium opacity-80 max-w-sm mx-auto italic-none">
            Architecting premium digital templates for life's most precious moments.
          </p>
        </div>

        {/* Navigation Links - Single row, Title Case */}
        <div className="flex flex-row justify-center items-center gap-x-2.5 mb-6 whitespace-nowrap font-montserrat">
          <button 
            onClick={(e) => handleLinkClick(e, 'terms-conditions')}
            className="text-[10px] md:text-[11px] font-bold text-gray-500 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white transition-colors"
          >
            Terms & Conditions
          </button>
          <span className="text-gray-300 dark:text-gray-800 text-[10px]">•</span>
          <button 
            onClick={(e) => handleLinkClick(e, 'privacy-policy')}
            className="text-[10px] md:text-[11px] font-bold text-gray-500 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <span className="text-gray-300 dark:text-gray-800 text-[10px]">•</span>
          <button 
            onClick={(e) => handleLinkClick(e, 'contact-page')}
            className="text-[10px] md:text-[11px] font-bold text-gray-500 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Copyright and Signature - One line focused */}
        <div className="pt-2 w-full flex flex-col items-center gap-1 font-montserrat">
          <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-tight">
            © 2026 <a href="https://arhamadib.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Arham Adib</a>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1.5 group cursor-default font-cormorant">
            <span className="text-[13px] font-medium text-gray-400 dark:text-gray-500 italic">Made with</span>
            <Heart size={12} className="text-pink-500 fill-pink-500 animate-pulse" />
            <span className="text-[15px] font-bold text-purple-600 dark:text-purple-400">Aaham.</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-float-slow { animation: float-slow 10s infinite ease-in-out; }
        .animate-float-medium { animation: float-medium 8s infinite ease-in-out; }
      `}} />
    </footer>
  );
};

export default Footer;