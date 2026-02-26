import React, { useEffect, useState, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { Product } from '../types';
import { Clock, ArrowRight, Flame, TrendingUp, Sparkles, Eye, AlertCircle } from 'lucide-react';

export const ALL_PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    slug: 'happy-birthday-sahiba-v2',
    title: 'Happy Birthday Sahiba',
    description: 'A heartfelt birthday website created to express love, emotions, and unspoken feelings through soft visuals, gentle animations, and a warm, personal journey that makes Sahiba feel truly special.',
    currentPrice: 281,
    originalPrice: 499,
    thumbnailUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj350gLvLmELw4b3Nh98tiASycfZ9t4RYh7bTosqRZGPZ5iryfF2x6ajiV-QflWvkowcnMO1i65ErhQ-sq4jv3A7t5Y3PLfV25KsfClrS11JDBI3kgczua0E6A3tPLmpzX5zFcgp1qi4ASfg4FNJqaEROQWMlmhzN-f3zJTDcLzc4jVhh253BgY1IAT8A/s1600/happy-birthday-sahiba.png',
    videoUrl: 'https://ik.imagekit.io/0uswuasvrq/HAPPY%20BIRTHDAY%20SAHIBA.mp4',
    category: 'Birthday',
    badge: 'Hot Sell',
    checkoutUrl: 'https://superprofile.bio/vp/ENQZ4YqE',
    features: [
      { name: 'One-Screen Fit', description: 'Every page fits perfectly on screen with no background scrolling.' },
      { name: 'Smooth Animations', description: 'Fluid transitions with no lag, glitches, or stutter.' },
      { name: 'Smart Fixed UI', description: 'Navigation, footer, and music controls stay perfectly positioned.' },
      { name: 'Instant Media Loading', description: 'Images and audio load smoothly without delays.' },
      { name: 'True Responsive Design', description: 'Looks and feels perfect on mobile, desktop, and tablets.' },
      { name: 'Performance Optimized', description: 'Fast, stable, and smooth across all devices.' },
      { name: 'Fully Deployed Website', description: 'The website will be deployed as per your request within 12-24 hours.' }
    ],
    demoUrl: 'https://hbd-sahiba-jii.vercel.app/',
  },
  {
    id: 'p2',
    slug: 'happy-birthday-v1',
    title: 'Happy Birthday 1.0',
    description: 'A simple birthday-themed website designed to create a calm and lovely experience, where gentle visuals and smooth transitions come together to make Sahiba feel happy, appreciated, and special.',
    currentPrice: 28,
    originalPrice: 199,
    thumbnailUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEie3W0bhfUZaEb0ycYz4Djdh7oQM5YrKREENBuLGgzHPElVgFvLTSrOln9C1z3qYuVmMePn88y34wWnBHyG0LhtLUTazR2jtfdB0cOcQkmsNdukMB9vDsihKQeIdUS_F_apHrM3V8TOgoLzlXIV9DXJpc7qR61e-buLz_tM25gzJviEynWoAY1vdH1qFg/s1600/BIRTHDAY%20V2.png',
    videoUrl: 'https://ik.imagekit.io/3kka2lnk8/HAPY%20BIRTHDAY%20V1%20PREVIEW.mp4',
    category: 'Birthday',
    badge: 'Latest',
    checkoutUrl: 'https://superprofile.bio/vp/CMxxVg5o',
    features: [
      { name: 'One-Screen Fit', description: 'Every page fits perfectly on screen with no background scrolling.' },
      { name: 'Smooth Animations', description: 'Fluid transitions with no lag, glitches, or stutter.' },
      { name: 'Smart Fixed UI', description: 'Navigation, footer, and music controls stay perfectly positioned.' },
      { name: 'Instant Media Loading', description: 'Images and audio load smoothly without delays.' },
      { name: 'True Responsive Design', description: 'Looks and feels perfect on mobile, desktop, and tablets.' },
      { name: 'Performance Optimized', description: 'Fast, stable, and smooth across all devices.' },
      { name: 'Fully Deployed Website', description: 'The website will be deployed as per your request within 12-24 hours.' }
    ],
    demoUrl: 'https://birthday-v3-navy.vercel.app/',
  },
  {
    id: 'p3',
    slug: 'kahani-suno-lyrics',
    title: 'Kahani Suno Lyrics',
    description: 'A music lyrical website, Kahani Suno 2.0 by Kaifi Khalil, is made with love to share heartfelt emotions. It gently turns music into a personal story, created especially for Sahiba.',
    currentPrice: 0,
    originalPrice: 49,
    thumbnailUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgY9Vm5Ixx4h7d8FF17ZTkBvuDgh9QiD7vFJjBsKVnaT1Kc8aoe04vAK8m5MNF6dcAqyavkKed6kdP4B7SFgodI_cKnIuWjsZhxFKfooi5BPyexjoW1tvzhTtHPci7BfN8r4qkQqVEU7WnFbg2-_xNNv4kwh5f6gQI6QeYOalQjrN2skm7b-TqRhuVbsA/s1600/Kahani-Suno-Lyrics.png',
    videoUrl: 'https://ik.imagekit.io/3kka2lnk8/KAHANI%20SUNO%20VIDEO%20PREVIEW.mp4',
    category: 'Free',
    badge: 'Trending',
    checkoutUrl: 'mailto:arhamadib31@gmail.com?subject=Free Kahani Suno Lyrical Site Request&body=Hello Arham! I want the Kahani Suno Lyrical site which is free. Please share the next steps.',
    features: [
      { name: 'Lyrical', description: 'A lyrical storytelling experience inspired by Kahani Suno 2.0 that feels personal and emotional' },
      { name: 'Gentle', description: 'Soft visuals and smooth animations that create a calm, romantic mood' },
      { name: 'Flowing', description: 'Music-driven flow where emotions unfold naturally with each section' },
      { name: 'Intimate Design', description: 'A simple, intimate design focused on feelings rather than complexity' },
      { name: 'Heartfelt', description: 'Created with love to express unspoken emotions for Sahiba in a meaningful way' },
      { name: 'Performance Optimized', description: 'Fast, stable, and smooth across all devices.' },
      { name: 'Fully Deployed Website', description: 'The website will be deployed as per your request within 12-24 hours.' }
    ],
    demoUrl: 'https://kahanisuno-lyrics-site.vercel.app/',
  },
  {
    id: 'p4',
    slug: 'new-year-2026',
    title: 'New Year 2026',
    description: 'An interactive New Year website crafted to deliver a personal message and a memorable start to the year.',
    currentPrice: 149,
    originalPrice: 349,
    thumbnailUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVSxLN_ZbK4lNTA5xWKWxKoR5PvAtxUNVby2nHXvrGa5HH2o8CcpmG2diCcKjHU6YPJnlQsuZVZDMAHwsAuH1elxpn7i0RTkqZAYCZGr9OA9qQsDY_aEsK8aqCgnLkGJBqf849v4zbmtvZFPoWj8q97dvau6_M-eNcDPCF8Kj6yvjS4Ouf8ITHM1uBQA/s1600/Screenshot%202026-01-04%20215146.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-in-a-dark-room-with-neon-lights-41005-large.mp4',
    category: 'Special',
    badge: 'Trending',
    checkoutUrl: 'https://superprofile.bio/vp/new-year-site-🎉',
    features: [
      { name: 'Our Journey', description: 'Shows our journey from the first year up to 2025.' },
      { name: 'Beautiful Memories', description: 'Displays photos with dates and cute captions to relive special moments.' },
      { name: '4 Cute Games', description: 'Includes Catch Love, Match Our Vibes, Love Quiz, and Make a Bouquet.' },
      { name: 'Our Dreams', description: 'Showcases what we plan to do together in the coming years.' },
      { name: 'Background Music', description: 'Auto background music plays smoothly throughout the website.' },
      { name: 'Fully Mobile-Responsive Design', description: 'Optimized for mobile phones, tablets, and all screen sizes.' },
      { name: 'Fully Deployed Website', description: 'The website will be deployed as per your request within 12-24 hours.' }
    ],
    demoUrl: 'https://happy-new-year-madam-jii.vercel.app/',
  }
];

interface ProductsProps {
  onExploreMore?: () => void;
  onViewProduct: (product: Product) => void;
  onCategoryClick?: (category: string) => void;
}

const Products: React.FC<ProductsProps> = ({ onExploreMore, onViewProduct, onCategoryClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const homeProducts = ALL_PRODUCTS_DATA.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="pt-4 pb-8 bg-transparent transition-colors scroll-mt-20 overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <SectionHeading title="Premium Templates" subtitle="Speed up your workflow with my custom-made assets." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {homeProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ProductCard 
                product={product} 
                onClick={() => onViewProduct(product)}
                onCategoryClick={onCategoryClick}
              />
            </div>
          ))}
        </div>

        {onExploreMore && (
          <div className={`flex justify-center transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button 
              onClick={onExploreMore}
              className="group relative overflow-hidden flex items-center gap-2 px-8 py-3.5 bg-gray-950 dark:bg-blue-600 text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
              Explore More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProductCard: React.FC<{ 
  product: Product; 
  onClick: () => void;
  onCategoryClick?: (category: string) => void;
}> = ({ product, onClick, onCategoryClick }) => {
  const isOutOfStock = product.stockCount === 0;
  const isLowStock = product.stockCount !== undefined && product.stockCount > 0 && product.stockCount <= 5;
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100) 
    : 0;

  const getBadgeIcon = () => {
    switch (product.badge) {
      case 'Hot Sell': return <Flame size={14} className="fill-current" />;
      case 'Trending': return <TrendingUp size={14} />;
      case 'Latest': return <Sparkles size={14} />;
      default: return null;
    }
  };

  const getBadgeStyles = () => {
    switch (product.badge) {
      case 'Hot Sell': return 'bg-[#ff7e14] text-white';
      case 'Trending': return 'bg-blue-600 text-white';
      case 'Latest': return 'bg-purple-600 text-white';
      default: return 'bg-gray-900 text-white';
    }
  };

  const productHref = `/store/${product.slug}`;

  return (
    <a 
      href={productHref}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group bg-white dark:bg-[#111827] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col relative cursor-pointer no-underline block ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}
    >
      {product.badge && !product.comingSoon && !isOutOfStock && (
        <div className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-xl ${getBadgeStyles()}`}>
          {getBadgeIcon()}
          {product.badge}
        </div>
      )}

      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.thumbnailUrl} 
          alt={product.title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${product.comingSoon || isOutOfStock ? 'grayscale opacity-80' : ''}`}
        />
        
        {!product.comingSoon && !isOutOfStock && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl">
            <div className="flex items-center gap-2 px-3">
              {product.originalPrice && (
                <span className="text-[#666] line-through text-[11px] font-bold tracking-tight">₹{product.originalPrice}</span>
              )}
              <span className="text-white font-black text-[14px] tracking-tighter">₹{product.currentPrice}</span>
            </div>
            
            {discountPercentage > 0 && (
              <span className="bg-[#e63946] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-inner">
                {discountPercentage}%
              </span>
            )}
          </div>
        )}

        {isOutOfStock && !product.comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="bg-gray-900 text-white text-[10px] font-black px-6 py-2.5 rounded-full shadow-2xl uppercase tracking-[0.2em] border border-white/20">
              Out of Stock
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
           <span 
             onClick={(e) => {
               if (onCategoryClick) {
                 e.preventDefault();
                 e.stopPropagation();
                 onCategoryClick(product.category);
               }
             }}
             className="inline-block px-4 py-1.5 rounded-xl border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/5 dark:bg-blue-900/40 text-[#4299e1] dark:text-[#63b3ed] text-[10px] font-black uppercase tracking-[0.15em] mb-3 hover:bg-blue-500/10 transition-colors cursor-pointer"
           >
             {product.category}
           </span>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors leading-tight mb-2">
             {product.title}
           </h3>
           
           {isLowStock && !isOutOfStock && (
             <div className="flex items-center gap-2 text-[#ed8936] text-[11px] font-black uppercase tracking-[0.05em] animate-pulse">
               <AlertCircle size={14} className="stroke-[3]" />
               ONLY {product.stockCount} LEFT
             </div>
           )}
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed font-medium">
          {product.description}
        </p>
        
        <div className="mt-auto">
          {product.comingSoon ? (
             <button 
              disabled
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200 dark:border-gray-700 text-xs"
            >
              <Clock size={16} />
              SOON
            </button>
          ) : isOutOfStock ? (
            <button 
              disabled
              className="w-full bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200 dark:border-gray-700 text-xs"
            >
              <AlertCircle size={16} />
              SOLD OUT
            </button>
          ) : (
            <div 
              className="relative overflow-hidden w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 uppercase tracking-[0.1em] text-xs"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
              VIEW
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default Products;
