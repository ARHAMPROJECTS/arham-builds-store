import React, { useEffect, useState, useRef } from 'react';
import { Database, Terminal, Users, Sparkles, Award, Globe, Rocket, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
            setIsPaused(false);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPaused(true);
          }
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
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
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div ref={sectionRef} className="pt-8 pb-16 bg-transparent text-gray-900 dark:text-white transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Content Column */}
          <div className={`w-full lg:w-1/2 space-y-8 transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                Arham <span className="text-blue-600 italic">Builds.</span>
              </h2>
              <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-medium">
              <p>
                I’m Arham Adib, a 16-year-old designer and developer with a passion for creating cinematic digital experiences. I believe that special moments deserve more than just a message; they deserve a masterpiece.
              </p>
              <p>
                With over 2 years of professional exploration in web design and video editing, I focus on performance, aesthetics, and emotional impact. Every template is architected with care, ensuring your story is told through buttery-smooth animations and premium UI.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
               <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <Globe size={14} className="text-blue-500" />
                  BAHADURGANJ, BIHAR
               </div>
               <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-800 self-center"></div>
               <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <Users size={14} className="text-blue-500" />
                  10+ VERIFIED CUSTOMERS
               </div>
            </div>
          </div>

          {/* Video & Stats Visual Column */}
          <div className={`w-full lg:w-1/2 space-y-3 transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
             <div className="relative group">
                
                {/* Video Player Frame */}
                <div 
                  className="aspect-video rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-white/5 shadow-2xl relative z-10 bg-black cursor-pointer group/video"
                  onClick={togglePlay}
                >
                   <video 
                    ref={videoRef}
                    src="https://files.catbox.moe/t0l7ir.mp4" 
                    className="w-full h-full object-cover brightness-[0.9] group-hover/video:brightness-100 transition-all duration-700" 
                    loop
                    muted={isMuted}
                    playsInline
                   />
                   
                   {/* Custom Player Controls Overlay */}
                   <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-end">
                        <button 
                          onClick={toggleMute}
                          className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
                        >
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                               {isPaused ? <Play size={12} fill="white" className="ml-0.5" /> : <Pause size={12} fill="white" />}
                            </div>
                            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">About Arham Builds</span>
                         </div>
                      </div>
                   </div>

                   {/* Large Centered Play/Pause Indicator (Only when paused) */}
                   {isPaused && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                           <Play size={18} className="text-white fill-white ml-1" />
                        </div>
                     </div>
                   )}
                </div>
             </div>

             {/* Statistics Grid - Small boxes with tight gap */}
             <div className="grid grid-cols-2 gap-3 relative z-10">
                <AboutStatCard 
                  icon={<Database size={14} className="text-blue-600" />} 
                  label="HAPPY CUSTOMERS" 
                  value="10+" 
                  delay={0}
                />
                <AboutStatCard 
                  icon={<Terminal size={14} className="text-blue-600" />} 
                  label="SITES CRAFTED" 
                  value="25+" 
                  delay={0.2}
                />
                <AboutStatCard 
                  icon={<Award size={14} className="text-blue-600" />} 
                  label="EDITOR GURU" 
                  value="Certified" 
                  delay={0.4}
                />
                <AboutStatCard 
                  icon={<Rocket size={14} className="text-blue-600" />} 
                  label="EXPERIENCE" 
                  value="2+ Years" 
                  delay={0.6}
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutStatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; delay: number }> = ({ icon, label, value, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5, 
      delay: delay * 0.1 
    }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group p-4 bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col items-center text-center gap-2 transition-all duration-500 hover:bg-gray-50 dark:hover:bg-white/[0.05] shadow-sm hover:shadow-md"
  >
    <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
      {icon}
    </div>
    <div>
      <p className="text-lg font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-0.5">{value}</p>
      <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em]">{label}</p>
    </div>
  </motion.div>
);

export default About;