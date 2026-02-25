
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ShoppingBag, ChevronDown, Zap } from 'lucide-react';
import { View } from '../App';
import { useCart } from '../context/CartContext';

const LOGO_URL = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_k4CqxRUYByW2SZXhkby2AxlfiQFsW6jm-KFzlA__1go2Lmu1AxA8hgyXDpEHwxyeBCRbpelQeIJnBfwPCzEhOeXxEUmoCiogiJxr-MwMahQymXwnoy5peuHdUGNlPAXXFzgtx4R3udF4oV20QdEFrfki71UE59XvuI5RDeGk26MkdNlRFMiz6nzqTw/s320/ArhamBuildsLogo.png";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  currentView: View;
  activeSection?: string;
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, currentView, activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { items } = useCart();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLinkClick = (v: View) => {
    setIsOpen(false);
    onNavigate(v);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <div className="fixed top-4 left-0 w-full z-[100] flex justify-center px-4">
        <nav className={`relative flex items-center justify-between transition-all duration-500 ease-in-out px-5 py-2 rounded-full bg-[#F1F0EC]/95 dark:bg-gray-900/95 backdrop-blur-3xl border border-gray-200/50 dark:border-white/10 shadow-xl`}>
          <div className="flex items-center gap-2">
            <a href="/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} className="text-sm font-black tracking-tighter text-[#1a1f2c] dark:text-white uppercase px-2">
              ARHAM <span className="text-blue-600">BUILDS.</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-1 mx-6">
            {['Home', 'Store', 'About', 'FAQ'].map((name) => {
              const view = (name === 'Verify' ? 'verification' : (name === 'Templates' ? 'store' : name.toLowerCase())) as View;
              const isActive = currentView === 'home' 
                ? (activeSection === view)
                : (currentView === view);

              return (
                <a
                  key={name}
                  href={`/${name.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(view); }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${isActive ? 'text-blue-600 bg-blue-50 dark:bg-white/10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white'}`}
                >
                  {name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => handleLinkClick('store')} className="relative p-2 text-gray-500 dark:text-gray-400">
              <ShoppingBag size={18} />
              {cartItemCount > 0 && <span className="absolute top-0 right-0 bg-blue-600 text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">{cartItemCount}</span>}
            </button>
            <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-black dark:text-white"><Menu size={20} /></button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[999] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-white dark:bg-[#0b1120]" />
        
        <div className="relative h-full flex flex-col pt-12 pb-6 overflow-y-auto no-scrollbar">
          <div className="px-8 pb-2 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-white/10">
                   <img 
                     src={LOGO_URL} 
                     alt="Logo" 
                     className="w-full h-full object-contain scale-110" 
                   />
                </div>
                <span className="text-sm font-black tracking-tighter text-[#1a1f2c] dark:text-white uppercase">
                  ARHAM <span className="text-blue-600">BUILDS.</span>
                </span>
             </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-900 dark:text-white transition-all active:scale-90 p-2"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          <div className="flex-1 px-8 flex flex-col justify-center py-10">
            <div className="flex flex-col">
              <a href="/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} className="w-full text-left py-4 text-[20px] font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/[0.05] hover:pl-2 transition-all">Home</a>
              
              <a href="/store" onClick={(e) => { e.preventDefault(); handleLinkClick('store'); }} className="w-full text-left py-4 text-[20px] font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/[0.05] hover:pl-2 transition-all">Store</a>

              <div className="border-b border-gray-100 dark:border-white/[0.05]">
                <button onClick={() => toggleSection('shop')} className="w-full flex items-center justify-between py-4 text-[20px] font-medium text-gray-900 dark:text-white group">
                  <span className="group-hover:pl-2 transition-all">Imp. Pages</span>
                  <ChevronDown size={18} strokeWidth={1.5} className={`transition-transform duration-500 ${expandedSection === 'shop' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${expandedSection === 'shop' ? 'max-h-56 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col space-y-3 pl-4 pt-1">
                    <a href="/faq" onClick={(e) => { e.preventDefault(); handleLinkClick('faq'); }} className="text-left text-[15px] font-normal text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">FAQ</a>
                    <a href="/privacy" onClick={(e) => { e.preventDefault(); handleLinkClick('privacy-policy'); }} className="text-left text-[15px] font-normal text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">Privacy & Policy</a>
                    <a href="/terms" onClick={(e) => { e.preventDefault(); handleLinkClick('terms-conditions'); }} className="text-left text-[15px] font-normal text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">Terms & Conditions</a>
                    <a href="/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact-page'); }} className="text-left text-[15px] font-normal text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">Contact</a>
                  </div>
                </div>
              </div>
              
              <a href="https://arhamadib.in" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-between py-4 text-[20px] font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/[0.05] group">
                <span className="group-hover:pl-2 transition-all">My Profile</span>
                <Zap size={18} className="text-blue-500 animate-pulse" />
              </a>

              <a href="/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact-page'); }} className="w-full text-left py-4 text-[20px] font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/[0.05] hover:pl-2 transition-all">Contact</a>
            </div>
          </div>

          <div className="mt-auto text-center px-8 pb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
              © 2026 ARHAM BUILDS.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
