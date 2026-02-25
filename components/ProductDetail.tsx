import React, { useState, useEffect, useRef } from 'react';
import { Product, Feature } from '../types';
import { 
  ArrowLeft, Check, ExternalLink, CreditCard, Flame, TrendingUp, Sparkles, 
  Clock, ShieldCheck, Zap, Package, Calendar, RefreshCcw, Info, AlertCircle, 
  ChevronRight, MousePointer2, FileText, Send, Rocket, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import { ALL_PRODUCTS_DATA, ProductCard } from './Products';
import CustomVideoPlayer from './CustomVideoPlayer';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onCheckout: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const InteractiveFeature: React.FC<{ feature: Feature }> = ({ feature }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative group py-1.5 flex items-center gap-3 cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 p-1 rounded-md transition-transform group-hover:scale-110">
        <Check size={14} className="text-blue-500" />
      </div>
      <h4 className="font-medium text-gray-700 dark:text-gray-200 text-sm border-b border-transparent group-hover:border-blue-500/30 transition-all">
        {feature.name}
      </h4>

      <div 
        className={`absolute bottom-full left-0 mb-3 w-64 z-50 transition-all duration-300 pointer-events-none ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 relative">
          <span className="block text-[9px] font-black uppercase tracking-widest text-blue-500 mb-1">
            {feature.name}
          </span>
          <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
            {feature.description}
          </p>
          <div className="absolute top-full left-6 -translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onCheckout, onViewProduct }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsRevealed(true);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update progress for native video
  useEffect(() => {
    if (isPlaying && !isPaused && videoRef.current) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          const duration = videoRef.current.duration;
          if (duration && !isNaN(duration)) {
            const p = (videoRef.current.currentTime / duration) * 100;
            setProgress(p);
          }
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isPaused]);

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
      case 'Hot Sell': return 'bg-orange-500 text-white';
      case 'Trending': return 'bg-blue-600 text-white';
      case 'Latest': return 'bg-purple-600 text-white';
      default: return 'bg-gray-900 text-white';
    }
  };

  const recommendedProducts = ALL_PRODUCTS_DATA
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const isYouTube = Boolean(product.videoUrl?.includes('youtube.com') || product.videoUrl?.includes('youtu.be'));
  
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2] && match[2].length === 11) ? match[2] : null;
    if (!videoId) return '';
    
    // Custom parameters to hide YouTube branding as much as possible
    const params = [
      'autoplay=1',
      'mute=1', // Required for reliable autoplay in most browsers
      'controls=1', // Show controls for better UX if custom ones fail
      'modestbranding=1',
      'rel=0',
      'showinfo=0',
      'iv_load_policy=3',
      'fs=1',
      'playsinline=1',
      `playlist=${videoId}`,
      'loop=1',
      'enablejsapi=1'
    ].join('&');
    
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  };

  const toggleVideoPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (isYouTube) {
      // For YouTube, we simulate play/pause by using the state
      const newState = !isPaused;
      setIsPaused(newState);
      if (iframeRef.current?.contentWindow) {
        const command = newState ? 'pauseVideo' : 'playVideo';
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
      }
      return;
    }

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (isYouTube && iframeRef.current?.contentWindow) {
      const command = newMuteState ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
    } else if (videoRef.current) {
      videoRef.current.muted = newMuteState;
    }
  };

  return (
    <div ref={containerRef} className="py-8 md:py-12 min-h-screen bg-[#F1F0EC] dark:bg-[#0b1120] transition-colors overflow-hidden">
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all mb-6 font-medium text-sm hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* LEFT COLUMN */}
          <div className={`w-full lg:w-1/2 space-y-3 transition-all duration-1000 delay-400 transform ${isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="space-y-3">
              {product.videoUrl && !isYouTube ? (
                <CustomVideoPlayer 
                  videoUrl={product.videoUrl} 
                  thumbnailUrl={product.thumbnailUrl} 
                  title={product.title} 
                />
              ) : (
                <div 
                  className={`relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-black group/video cursor-pointer`}
                  onClick={() => !isOutOfStock && !isPlaying && setIsPlaying(true)}
                >
                  {product.badge && !isPlaying && (
                    <div className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${getBadgeStyles()}`}>
                      {getBadgeIcon()}
                      {product.badge}
                    </div>
                  )}
                  
                  {!isPlaying ? (
                      <>
                          <img 
                            src={product.thumbnailUrl} 
                            alt={product.title} 
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105 ${isOutOfStock ? 'grayscale opacity-70' : 'brightness-[0.85]'}`}
                          />
                          {!isOutOfStock && product.videoUrl && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center animate-pulse group-hover/video:scale-110 transition-transform">
                                      <Play size={24} className="text-white fill-white ml-1" />
                                  </div>
                                  <p className="mt-4 text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Watch Preview</p>
                              </div>
                          )}
                      </>
                  ) : (
                      <div className="w-full h-full relative" onClick={toggleVideoPlay}>
                          {isYouTube ? (
                              <iframe 
                                ref={iframeRef}
                                src={getYouTubeEmbedUrl(product.videoUrl)}
                                className="w-full h-full relative z-10"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title={product.title}
                              />
                          ) : (
                              <video 
                                ref={videoRef} 
                                src={product.videoUrl} 
                                className="w-full h-full object-cover" 
                                autoPlay 
                                loop 
                                muted={isMuted}
                                playsInline 
                                onPause={() => setIsPaused(true)}
                                onPlay={() => setIsPaused(false)}
                              />
                          )}
                          
                          {/* Custom Player Overlay - Hides YouTube controls and adds our own */}
                          <div className="absolute inset-0 z-30 opacity-0 group-hover/video:opacity-100 transition-opacity flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none">
                              <div className="flex justify-between items-start pointer-events-auto">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }} 
                                    className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:bg-black/60 transition-all active:scale-90"
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <div className="flex gap-2">
                                  {!isYouTube && (
                                    <button 
                                      onClick={toggleMute}
                                      className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:bg-black/60 transition-all active:scale-90"
                                    >
                                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                    </button>
                                  )}
                                </div>
                              </div>
  
                              {!isYouTube && (
                                <div className="flex flex-col gap-3 pointer-events-auto">
                                  {/* Custom Progress Bar */}
                                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-500 transition-all duration-300"
                                      style={{ width: `${progress}%` }}
                                    ></div>
                                  </div>
  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <button onClick={toggleVideoPlay} className="text-white hover:text-blue-400 transition-colors">
                                        {isPaused ? <Play size={24} fill="white" /> : <Pause size={24} fill="white" />}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
  
                          {/* Large Play/Pause Toggle Indicator */}
                          {isPaused && !isYouTube && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none z-20">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center">
                                    <Play size={24} className="text-white fill-white ml-1" />
                                </div>
                            </div>
                          )}
                      </div>
                  )}
  
                  {isOutOfStock && !isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                      <span className="bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-default">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={18} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[11px]">Safe Purchase</h4>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400">Verified & Secure</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-default">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Zap size={18} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[11px]">Fast Delivery</h4>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400">Within 12-24 Hours</p>
                </div>
              </div>
            </div>

            {/* Delivery Process - Only Desktop to fill blank space */}
            <div className="hidden lg:block pt-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-3 mb-6">
                <Rocket size={16} className="text-blue-500" />
                The Magic Process
              </h3>
              <div className="space-y-6 relative ml-2">
                <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gray-100 dark:bg-gray-800"></div>
                
                <div className="relative flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 z-10 shadow-sm group-hover:scale-110 group-hover:border-blue-500/30 transition-all">
                    <MousePointer2 size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">Step 1: Pick Your Template</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">Choose the perfect design and place your order securely through our store.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 z-10 shadow-sm group-hover:scale-110 group-hover:border-purple-500/30 transition-all">
                    <FileText size={16} className="text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">Step 2: Submit Your Details</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">Fill out the customization form with your photos, messages, and preferences.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 z-10 shadow-sm group-hover:scale-110 group-hover:border-green-500/30 transition-all">
                    <Send size={16} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 transition-colors">Step 3: Live in 24 Hours</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">Receive your ready-to-share live link and QR code directly to your email or chat.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Products - Only Desktop to fill blank space */}
            <div className="hidden lg:block pt-8 border-t border-gray-50 dark:border-gray-800/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-3">
                  <Sparkles size={14} className="text-yellow-500" />
                  Recommended for You
                </h3>
                <button 
                  onClick={onBack}
                  className="group text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
                >
                  View All <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {recommendedProducts.map(p => (
                  <div key={p.id} className="scale-[0.9] origin-top-left -mr-4 -mb-4">
                    <ProductCard product={p} onClick={() => onViewProduct(p)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 transform ${isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-lg border border-blue-500/40 dark:border-blue-400/30 bg-blue-500/10 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-[0.15em]">
                  {product.category}
                </span>
                
                {isLowStock && !isOutOfStock && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] font-black uppercase tracking-wider border border-orange-500/30 animate-pulse">
                    <AlertCircle size={10} /> Limited Stock: Only {product.stockCount} left
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2 leading-tight tracking-tight">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price and Offer Section */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">₹{product.currentPrice}</span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through font-medium">₹{product.originalPrice}</span>
                  )}
                </div>
                
                {product.originalPrice && !isOutOfStock && discountPercentage > 0 && (
                  <span className="bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-widest animate-pulse">
                    SAVE {discountPercentage}%
                  </span>
                )}
              </div>
              
              {product.originalPrice && !isOutOfStock && (
                <div>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-green-200/50 dark:border-green-800/30 whitespace-nowrap">
                    Limited Time Offer
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 mb-8">
              <button 
                onClick={() => !isOutOfStock && onCheckout(product)}
                disabled={isOutOfStock}
                className={`group relative overflow-hidden flex-1 py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider ${
                  isOutOfStock 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/10 hover:scale-105 active:scale-95'
                }`}
              >
                {!isOutOfStock && (
                  /* Blue button: Constant slow 10s white shimmer (low capacity) */
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                )}
                {isOutOfStock ? <AlertCircle size={16} /> : <CreditCard size={16} className="group-hover:scale-110 transition-transform" />}
                {isOutOfStock ? 'Out of Stock' : 'Order Now'}
              </button>
              
              {product.demoUrl && (
                <a 
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 text-xs border border-gray-200 dark:border-gray-700 uppercase tracking-wider shadow-sm"
                >
                  {/* Light/White button: Constant slow 10s blue shimmer (low capacity) */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/15 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                  <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                  Live Demo
                </a>
              )}
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Sparkles size={12} className="text-blue-500" />
                Key Features
              </h3>
              <div className="flex flex-col">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="transition-all duration-700 transform" style={{ transitionDelay: `${idx * 100 + 500}ms`, opacity: isRevealed ? 1 : 0, transform: isRevealed ? 'translateY(0)' : 'translateY(10px)' }}>
                    <InteractiveFeature feature={feature} />
                  </div>
                ))}
              </div>
            </div>

            <div className={`space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800 transition-all duration-1000 delay-700 transform ${isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/20 group hover:shadow-lg transition-all">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mb-2">
                  <Package size={14} className="group-hover:scale-110 transition-transform" />
                  What You’ll Receive
                </h4>
                <ul className="space-y-1 text-[12px] text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Customisation Form</li>
                  <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Personalize it using your own images & text</li>
                  <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Ready-made Default Link / QR Code</li>
                  <li className="flex items-center gap-2 text-red-500 font-bold"><Zap size={12} /> Order cannot be cancelled after placed!</li>
                </ul>
              </div>

              {/* Data Privacy Section */}
              <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 group hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-emerald-500 p-1.5 rounded-lg text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    100% SECURE DATA PRIVACY
                  </h4>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use your photos and text only to create your requested website. All personal assets are securely deleted after the hosting period ends.
                </p>
              </div>

              <div className="bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/20 group hover:shadow-lg transition-all">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-2 mb-2">
                  <Calendar size={14} className="group-hover:scale-110 transition-transform" />
                  Website Validity
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your website will remain active for <b>2 months</b>. Extensions can be requested via email.
                </p>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20 group hover:shadow-lg transition-all">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-2">
                  <RefreshCcw size={14} className="group-hover:rotate-180 transition-all duration-700" />
                  Guarantee
                </h4>
                <p className="text-[11px] text-gray-700 dark:text-gray-300 mb-3 font-medium">
                  100% money-back guarantee if we fail to deliver within 24 hours of form submission.
                </p>
                <div className="flex gap-2 items-start bg-white/50 dark:bg-gray-900/50 p-2.5 rounded-xl">
                  <Clock size={16} className="text-amber-500 flex-shrink-0" />
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">
                    <b>Note:</b> Delivery timer starts <b>after</b> you submit the customization form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;