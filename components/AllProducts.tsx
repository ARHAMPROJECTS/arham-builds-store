import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ALL_PRODUCTS_DATA, ProductCard } from './Products';
import { Search, SlidersHorizontal, ArrowLeft, X, ChevronRight, Check, RefreshCcw, Star, Sparkles, Layout, Zap, Shield, Heart } from 'lucide-react';
import { Product } from '../types';

interface AllProductsProps {
  onBack: () => void;
  onViewProduct: (product: Product) => void;
  initialCategory?: string;
}

const StoreDecoration = () => {
  const storeHearts = [
    { size: 44, top: '12%', left: '10%', color: 'text-pink-500/40', delay: '0s' },
    { size: 32, top: '55%', left: '8%', color: 'text-rose-400/40', delay: '1s' },
    { size: 38, top: '30%', right: '5%', color: 'text-pink-600/30', delay: '2s' },
  ];

  const storeSparkles = [
    { size: 38, top: '25%', right: '12%', color: 'text-amber-400/40', delay: '0.5s' },
    { size: 28, top: '65%', right: '15%', color: 'text-blue-500/40', delay: '1.5s' },
    { size: 24, top: '45%', left: '25%', color: 'text-indigo-500/30', delay: '2.5s' },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0 select-none">
      {/* Render Store Hearts */}
      {storeHearts.map((h, i) => (
        <div 
          key={`store-heart-${i}`}
          className="absolute animate-float-slow hidden lg:block"
          style={{ top: h.top, left: h.left || 'auto', right: h.right || 'auto', animationDelay: h.delay }}
        >
          <Heart size={h.size} className={`${h.color} fill-current/5`} strokeWidth={0.5} />
        </div>
      ))}

      {/* Render Store Sparkles */}
      {storeSparkles.map((s, i) => (
        <div 
          key={`store-sparkle-${i}`}
          className="absolute animate-float-medium hidden lg:block"
          style={{ top: s.top, right: s.right || 'auto', left: s.left || 'auto', animationDelay: s.delay }}
        >
          <Sparkles size={s.size} className={s.color} strokeWidth={0.5} />
        </div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse-soft { animation: pulse-soft 8s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 10s infinite ease-in-out; }
        .animate-float-medium { animation: float-medium 12s infinite ease-in-out; }
        .animate-float-fast { animation: float-fast 8s infinite ease-in-out; }
      `}} />
    </div>
  );
};

const AllProducts: React.FC<AllProductsProps> = ({ onBack, onViewProduct, initialCategory = 'All Products' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Products': ALL_PRODUCTS_DATA.length
    };
    ALL_PRODUCTS_DATA.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categories = useMemo(() => Object.keys(categoryCounts), [categoryCounts]);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS_DATA.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFilterOpen(false);
    };
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="py-12 md:py-20 min-h-screen bg-[#F1F0EC] dark:bg-[#0b1120] transition-colors relative">
      <StoreDecoration />
      
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Website <br className="md:hidden" /> Templates
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed font-medium">
            Browse our collection of premium website templates designed for special moments and unique occasions.
          </p>
        </div>

        {/* Navigation Row */}
        <div className="flex justify-start mb-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        {/* Search & Filter Trigger Bar */}
        <div className="relative z-[60]" ref={filterRef}>
          <div className="flex gap-3 mb-4 h-[60px]">
            <div className="relative flex-1 group h-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-12 pr-12 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white transition-all shadow-sm font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`relative w-[60px] h-[60px] rounded-2xl border transition-all flex items-center justify-center overflow-hidden flex-shrink-0 ${
                isFilterOpen || activeCategory !== 'All Products'
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20 active:scale-90' 
                : 'bg-white dark:bg-[#111827] border-gray-200 dark:border-white/5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95'
              }`}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <SlidersHorizontal 
                  size={24} 
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isFilterOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isFilterOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Filter Dropdown */}
          <div 
            className={`absolute top-full left-0 right-0 mt-3 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
              isFilterOpen 
                ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
            }`}
          >
            <div className="bg-white dark:bg-[#0b1120] border border-gray-100 dark:border-white/10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Select Collection</span>
                <button 
                  onClick={() => handleCategorySelect('All Products')}
                  className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCcw size={10} /> Reset Filters
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categories.map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex justify-between items-center px-5 py-4 rounded-2xl transition-all group font-bold ${
                      activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {activeCategory === cat ? (
                        <Check size={16} className="text-white animate-scale-in" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:scale-150 transition-transform" />
                      )}
                      <span className="text-sm tracking-tight">{cat}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-tighter ${
                      activeCategory === cat 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}>
                      {categoryCounts[cat]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Label Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-6 mb-8 mt-12">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full bg-blue-500 ${isFilterOpen ? 'animate-ping' : ''}`} />
            <span className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Showing {filteredProducts.length} Results
            </span>
          </div>
          
          {activeCategory !== 'All Products' && (
            <button 
              onClick={() => handleCategorySelect('All Products')}
              className="group flex items-center gap-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-100/50 dark:border-blue-800/30"
            >
              Collection: <span className="text-blue-700 dark:text-blue-300">{activeCategory}</span>
              <X size={12} className="group-hover:rotate-90 transition-transform" />
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ProductCard 
                  product={product} 
                  onClick={() => onViewProduct(product)}
                  onCategoryClick={handleCategorySelect}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white dark:bg-[#111827] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 dark:bg-white/5 text-gray-400 mb-6">
              <Search size={44} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">No templates found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
              We couldn't find any templates matching your criteria. Try widening your search or choosing a different category.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); handleCategorySelect('All Products'); }}
              className="px-10 py-4 bg-blue-600 text-white rounded-full font-black shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-95 uppercase tracking-widest text-xs"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;