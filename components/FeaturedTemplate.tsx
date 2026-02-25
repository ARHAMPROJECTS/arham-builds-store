import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Zap, Heart } from 'lucide-react';
import { Product } from '../types';

interface FeaturedTemplateProps {
  product: Product;
  onView: (product: Product) => void;
}

const FeaturedTemplate: React.FC<FeaturedTemplateProps> = ({ product, onView }) => {
  return (
    <div className="py-16 md:py-28 bg-[#f1f0ec] dark:bg-[#0b1120] transition-colors relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
           <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
             <Star size={12} className="text-amber-500 fill-amber-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500">Editor's Choice</span>
           </div>
           <h2 className="text-4xl md:text-7xl font-serif font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-4">
            Premium <span className="text-blue-600 italic">Flagship.</span>
           </h2>
           <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium tracking-tight max-w-xl leading-relaxed">
            Our most requested digital experience, engineered for deep emotional impact and flawless performance.
           </p>
        </div>

        <div className="bg-white dark:bg-slate-900/40 rounded-[3.5rem] md:rounded-[5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch group hover:border-blue-500/20 transition-all duration-700">
          
          {/* Media Section */}
          <div className="w-full lg:w-[55%] relative overflow-hidden aspect-video lg:aspect-auto">
             <img 
               src={product.thumbnailUrl} 
               alt={product.title} 
               className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
             
             {/* Dynamic Badge */}
             <div className="absolute top-8 left-8">
                <div className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                  <Zap size={14} className="fill-white" /> BESTSELLER
                </div>
             </div>
             
             {/* Category Tag */}
             <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-2 text-white/80">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{product.category} Special</span>
                </div>
             </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white dark:bg-[#0f172a]/80 backdrop-blur-xl">
             <div className="space-y-8 md:space-y-12">
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <Heart size={20} className="fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em]">2026 Edition</span>
                   </div>
                   <h3 className="text-3xl md:text-5xl font-serif font-black text-gray-900 dark:text-white leading-tight tracking-tighter">
                     {product.title}
                   </h3>
                   <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed font-medium italic">
                     "{product.description}"
                   </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
                   {[
                     { icon: <Zap size={14} />, text: "Instant Deployment" },
                     { icon: <ShieldCheck size={14} />, text: "Lifetime Hosting" },
                     { icon: <Sparkles size={14} />, text: "Custom Visuals" },
                     { icon: <Star size={14} />, text: "Premium Support" }
                   ].map((feat, i) => (
                     <div key={i} className="flex items-center gap-3 text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-tight">
                        <div className="text-blue-500">{feat.icon}</div>
                        {feat.text}
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-8">
                   <div className="text-center sm:text-left">
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Intro Price</p>
                      <div className="flex items-baseline gap-2">
                         <span className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">₹{product.currentPrice}</span>
                         <span className="text-sm text-gray-400 line-through opacity-50 font-bold">₹{product.originalPrice}</span>
                      </div>
                   </div>
                   <button 
                     onClick={() => onView(product)}
                     className="group relative overflow-hidden w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-3"
                   >
                     <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                     EXPLORE NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
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

export default FeaturedTemplate;