
import React from 'react';
import { ALL_PRODUCTS_DATA, ProductCard } from './Products';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface TemplatesPageProps {
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ onBack, onViewProduct }) => {
  return (
    <div className="py-12 md:py-20 min-h-screen bg-[#f4f2ee] dark:bg-[#0b1120] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Our Template <br /> <span className="text-blue-600">Collection.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore our professionally crafted digital experiences. Every template is mobile-optimized, fast, and ready to celebrate your special moments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_PRODUCTS_DATA.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onViewProduct(product)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 p-12 bg-white dark:bg-[#111827] rounded-[3rem] border border-gray-100 dark:border-white/5 text-center shadow-xl">
           <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Need something custom?</h3>
           <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">We can build a unique digital experience tailored exactly to your vision.</p>
           <a 
             href="mailto:arhamadib31@gmail.com" 
             className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
           >
             Contact for Custom Build
           </a>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
