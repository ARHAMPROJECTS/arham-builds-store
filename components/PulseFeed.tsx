import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Play, 
  Pause, 
  Music
} from 'lucide-react';

const AVATAR_URL = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhai4zRyvnaJySUfQuEpNk2_5swgbW8Y5ORrW71XgkZSXb1dl_umMBalTgUmgKTAr1hq0lx1iGd_SkXdWqS7ziDBPh4J1woEgs-ZOpGYsPjeCVWg-qomabYeAtafDKyQL0rcuHbfR1gunDI75QqlnvwibyXK999-87ZLnMDWahuySGAWxslsobOJsrDJm4/s964/play%20button%20(1).jpg";

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

interface SongInfo {
  title: string;
  artist: string;
  url: string;
}

interface PulsePost {
  id: string;
  date: string;
  title: string;
  caption: string;
  media: MediaItem[];
  song?: SongInfo;
}

const PULSE_ARCHIVE: PulsePost[] = [
  {
    id: 'pulse-001',
    date: 'Feb 15, 2026',
    title: 'CHRIS GROSSER',
    caption: "Opportunities don't happen. You create them.",
    song: {
      title: 'Inside Out',
      artist: 'Arham Adib',
      url: 'https://files.catbox.moe/wir4ms.mp3'
    },
    media: [
      { type: 'image', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhP2gsvtm87em4cKubgsZdXbkJYPLAV1xMoVZaE8D0_6R9r-qBWdPzRaG2cql-rFsdX_MtlCCmiz3bBBziDw96nAOlvw7-_YQgFmG9Hp_73nbJ7Sjidp5NX48X9J3sZALJqwqVmvCgg01A3VRn_Vxhq_NuZuZc9erPKwJGmf8P-36PnFgU1yzfuxPycrdI/s4032/1000170669.jpg' },
      { type: 'image', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5qNju8JpP0-YMGMqgY2EsTnWeK5Gui_YfhH1Z_To9APw8J5xmSHYHm3qvTW1NmcgDo-9kpOxB3IicQCKvGYSgcvbhDgcWYIhzv51zb-qljcXZ0uKg_ZlPqqJhEncWR1uBJMgvMLLYhRFx5QzgV5VVKgXwgQacbu6nAyRBotm4InzHubeKtYe1ulHAV1w/s4032/1000170679.jpg' },
      { type: 'video', url: 'https://files.catbox.moe/59wehb.mp4' }
    ]
  },
  {
    id: 'pulse-002',
    date: 'Feb 18, 2026',
    title: 'TONY GASKINS',
    caption: "If you don't build your own dream, someone will hire you to build theirs.",
    song: {
      title: 'Dream Architecture',
      artist: 'Tony Gaskins',
      url: 'https://files.catbox.moe/x8rzne.mp3'
    },
    media: [
      { type: 'image', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwg5sbjK8oxdHw3u4XBbeQVBcCshPCq33YB7yk9-U4l-8-JVS0TOWkmU7YisY07hnc3xU_k4xDygH9U9GET2uuAtT9B4lfQO8f0bjbigo2zjmwoGK1PO9tvfFOpYonwszZxSzZVEYPStq0b8veVf2AjXjBwBLs1Y9SfDl9B3IBN5Nu2D8tclWQRcXUD58/s914/1000162443.png' },
      { type: 'image', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgS0reX4Os_CFRMtLFEVgQKqYFb2IXI-qu7wbuOGHKjrtnnICYLvTVRoLB7pdKaUf3cvp6NkJEiF644UZ1HpawWVR2FlVw4uOQb70mDZnwQfyrYAvD8QpS8D6aPYDae1Sm04pf8KPz64J_J6Z_HrWaLaxlLXBXmF1I7jytBu5JgcMNmvzxNQIAT7xwBxDc/s1457/1000172162.png' }
    ]
  }
];

// High-fidelity verified badge with improved SVG paths and alignment
const PremiumVerifiedBadge: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    aria-label="Verified" 
    className={`flex-shrink-0 inline-block ${className}`} 
    style={{ width: size, height: size, verticalAlign: 'middle' }}
    role="img"
  >
    <title>Verified</title>
    {/* Scalloped Blue Circle */}
    <path 
      fill="#0095f6" 
      d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" 
    />
    {/* Refined Centered Checkmark */}
    <path 
      fill="#ffffff" 
      d="M10.74 15.68l-3.35-3.35 1.41-1.41 1.94 1.94 4.54-4.54 1.41 1.41-5.95 5.95z" 
    />
  </svg>
);

const SongBadge: React.FC<{ song: SongInfo }> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (audioRef.current) {
          if (entry.isIntersecting) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              setIsPlaying(false);
            });
          } else {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );

    if (badgeRef.current) observer.observe(badgeRef.current);
    return () => observer.disconnect();
  }, [song.url]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      ref={badgeRef}
      onClick={togglePlay}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/60 dark:bg-white/5 rounded-full border border-gray-200/50 dark:border-white/10 mt-4 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all group max-w-fit"
    >
      <div className={`relative ${isPlaying ? 'animate-pulse' : ''}`}>
        <Music size={12} className="text-gray-900 dark:text-white" />
        {isPlaying && (
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        )}
      </div>
      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-900 dark:text-white tracking-tight">
        <span className="truncate max-w-[120px]">{song.title}</span>
        <span className="opacity-40">•</span>
        <span className="opacity-60 truncate max-w-[100px]">{song.artist}</span>
      </div>
      <audio ref={audioRef} src={song.url} loop />
    </div>
  );
};

const CarouselItem: React.FC<{ item: MediaItem; isActive: boolean; alt: string; priority?: boolean }> = ({ item, isActive, alt, priority }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => setIsPaused(true));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, item.type]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <div className="w-full h-full flex-shrink-0 snap-center relative bg-gray-100 dark:bg-white/[0.02] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200/40 dark:bg-white/[0.03]">
          <div className="w-full h-full animate-shimmer-fast bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" style={{ backgroundSize: '200% 100%' }} />
        </div>
      )}

      {item.type === 'video' ? (
        <div className={`w-full h-full transition-opacity duration-300 cursor-pointer ${isLoaded ? 'opacity-100' : 'opacity-0'}`} onClick={togglePlay}>
          <video 
            ref={videoRef}
            src={item.url} 
            className="w-full h-full object-cover" 
            muted 
            loop 
            playsInline 
            autoPlay={isActive}
            onLoadedData={() => setIsLoaded(true)}
            preload={priority ? "auto" : "metadata"}
            aria-label={alt}
          />
          {isPaused && isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 scale-90 sm:scale-100">
                <Play size={24} className="text-white fill-white" />
              </div>
            </div>
          )}
          {isLoaded && (
            <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 pointer-events-none">
              {isPaused ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
            </div>
          )}
        </div>
      ) : (
        <img 
          src={item.url} 
          className={`w-full h-full object-cover transition-opacity duration-300 select-none pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
          alt={alt} 
          loading={priority ? "eager" : "lazy"}
          {...(priority ? { fetchPriority: "high" } : {})}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

const Carousel: React.FC<{ media: MediaItem[], altBase: string; isFirstPost?: boolean }> = ({ media, altBase, isFirstPost }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      if (index !== currentIndex) setCurrentIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/carousel w-full overflow-hidden select-none bg-gray-50 dark:bg-black/20 rounded-2xl shadow-inner border border-gray-100/50 dark:border-white/5">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-square"
      >
        {media.map((item, i) => (
          <CarouselItem 
            key={i} 
            item={item} 
            isActive={currentIndex === i} 
            alt={`${altBase} by Arham Adib - Digital Bhaiya Archive ${i + 1}`}
            priority={isFirstPost && i === 0}
          />
        ))}
      </div>

      {media.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
            {media.map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'bg-blue-500 w-3' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={() => scrollTo(currentIndex - 1)}
            className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/20 dark:bg-white/10 backdrop-blur-3xl rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-all ${currentIndex === 0 ? 'hidden' : ''}`}
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => scrollTo(currentIndex + 1)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/20 dark:bg-white/10 backdrop-blur-3xl rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-all ${currentIndex === media.length - 1 ? 'hidden' : ''}`}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
};

interface PulseFeedProps {
  onBack: () => void;
}

const PulseFeed: React.FC<PulseFeedProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F0EC] dark:bg-[#0b1120] transition-colors duration-700 font-sans selection:bg-blue-600 selection:text-white no-scrollbar pb-40">
      
      <div className="max-w-[480px] mx-auto pt-8 px-6">
        
        <div className="mb-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        
        <section className="mb-14 animate-apple-reveal">
           <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                 <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-500 shadow-xl shadow-blue-500/10">
                    <div className="w-full h-full rounded-full border-[3px] border-[#F1F0EC] dark:border-[#0b1120] overflow-hidden bg-white shadow-inner">
                      <img 
                        src={AVATAR_URL} 
                        className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" 
                        alt="Arham Adib profile photo - Founder of Digital Bhaiya" 
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-3.5">
                <h1 className="text-[24px] md:text-[28px] font-bold text-gray-900 dark:text-white tracking-tight leading-none">
                  Arham Adib
                </h1>
                <PremiumVerifiedBadge size={19} className="md:size-[21px] mt-0.5" />
              </div>

              <div className="space-y-1 px-4 max-w-[340px] mx-auto">
                 <p className="text-[13px] md:text-[14px] text-slate-500 dark:text-gray-400 font-medium leading-snug tracking-tight">
                    Architecting the future of viral storytelling.
                 </p>
                 <p className="text-[13px] md:text-[14px] text-slate-500 dark:text-gray-400 font-medium leading-snug tracking-tight">
                    Scaling brands through technical dominance at <span className="text-gray-900 dark:text-white font-bold">Digital Bhaiya Agency</span>.
                 </p>
              </div>
           </div>
        </section>

        <div className="space-y-24">
          {PULSE_ARCHIVE.map((post, idx) => (
            <section 
              key={post.id} 
              className="animate-apple-reveal" 
              style={{ animationDelay: `${(idx + 1) * 80}ms` }}
            >
              {/* REFINED POST HEADER ALIGNED WITH MEDIA */}
              <div className="flex items-center gap-3 mb-3.5 px-0.5">
                 <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-blue-600/20 to-indigo-500/20">
                    <div className="w-full h-full rounded-full overflow-hidden border border-white dark:border-gray-800 bg-white dark:bg-gray-900">
                      <img 
                        src={AVATAR_URL} 
                        className="w-full h-full object-cover" 
                        alt="Arham Adib" 
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-gray-900 dark:text-white tracking-tight leading-none">Arham Adib</span>
                      <PremiumVerifiedBadge size={15} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest leading-none">{post.date}</span>
                 </div>
              </div>

              <Carousel media={post.media} altBase={post.title} isFirstPost={idx === 0} />

              {/* SONG BADGE - KEPT BUT MOVED FOR BETTER ALIGNMENT WITHOUT ACTION BUTTONS */}
              {post.song && <SongBadge song={post.song} />}

              {/* CAPTION AREA - REFINED ALIGNMENT WITH NO INTERACTION BAR */}
              <div className="pt-4 space-y-2 px-0.5">
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[14px] font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 text-center">
            <div className="flex flex-col items-center gap-8">
                <div className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/5 flex items-center justify-center text-gray-300 dark:text-gray-600 border border-gray-200/50 dark:border-white/10">
                   <Sparkles size={16} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[9px] font-black text-gray-300 dark:text-gray-800 uppercase tracking-[0.6em] ml-[0.6em]">
                    ARCHIVE ENDS
                  </p>
                  <p className="text-[8px] font-medium text-gray-400/60 dark:text-gray-500 uppercase tracking-[0.2em]">
                    New Updates Deploying Weekly
                  </p>
                </div>
            </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes apple-reveal {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-fast {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-apple-reveal { animation: apple-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-shimmer-fast { 
          background-image: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          animation: shimmer-fast 1.5s infinite linear; 
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default PulseFeed;
