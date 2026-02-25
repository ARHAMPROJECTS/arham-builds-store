import React, { useEffect, useState, useRef } from 'react';
import { Project } from '../types';
import { 
  ArrowLeft, User, 
  Share2, Mail, ArrowRight, Sparkles, Cpu, PenTool,
  Activity, Play, Pause
} from 'lucide-react';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

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

  const handleShare = async () => {
    const url = `${window.location.origin}/projects/${project.slug}`;
    const shareData = {
      title: project.title,
      text: project.description,
      url: url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const isYouTube = project.videoUrl?.includes('youtube.com') || project.videoUrl?.includes('youtu.be');
  
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&vq=hd1080&widget_referrer=${window.location.origin}`;
  };

  const email = "arhamadib31@gmail.com";
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Hiring Inquiry: Editing Service')}&body=${encodeURIComponent("Hi Arham, I'm interested in your editing services for my project.")}`;

  return (
    <div className="min-h-screen bg-[#f1f0ec] dark:bg-[#0b1120] text-slate-900 dark:text-white transition-all duration-700 ease-in-out relative font-sans no-scrollbar select-none">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.03] dark:bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

      <div className="min-h-screen max-w-7xl mx-auto px-6 relative z-10 flex flex-col py-4">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8 h-10 shrink-0">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <button 
            onClick={handleShare}
            className="p-2.5 bg-white/50 dark:bg-white/[0.05] backdrop-blur-3xl border border-white/30 dark:border-white/10 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm relative"
          >
            <Share2 size={16} />
            {shareFeedback && (
              <span className="absolute top-full mt-2 right-0 bg-blue-600 text-white text-[8px] px-2 py-1 rounded font-black whitespace-nowrap animate-fade-in shadow-xl">Copied</span>
            )}
          </button>
        </div>

        {/* Main Cinematic Layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:justify-center py-6">
          
          {/* VIDEO PLAYER */}
          <div className="flex items-center justify-center shrink-0 w-full lg:w-auto h-auto">
            <div className="relative group/cinema w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px] aspect-[9/16]">
              <div 
                className="relative w-full h-full bg-black rounded-[2.2rem] sm:rounded-[2.8rem] lg:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-[5px] sm:border-[7px] border-white dark:border-white/10 cursor-pointer transition-all duration-700 hover:scale-[1.01] hover:border-blue-500/20"
                onClick={!isYouTube ? togglePlay : undefined}
              >
                {isVideoLoading && (
                  <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-[40px] transition-all duration-1000">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full border-[1px] border-slate-900/10 dark:border-white/10"></div>
                       <div className="absolute inset-0 rounded-full border-[2px] border-blue-600 border-t-transparent animate-spin"></div>
                       <Activity size={14} className="text-blue-600/30 animate-pulse" />
                    </div>
                  </div>
                )}

                <div className={`w-full h-full transition-opacity duration-1000 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}>
                  {isYouTube ? (
                    <iframe 
                      src={getYouTubeEmbedUrl(project.videoUrl!)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setIsVideoLoading(false)}
                      title={project.title}
                      loading="lazy"
                    />
                  ) : (
                    <video 
                      ref={videoRef}
                      src={project.videoUrl} 
                      poster={project.thumbnailUrl}
                      autoPlay loop playsInline
                      className="w-full h-full object-cover"
                      preload="metadata"
                      onLoadedData={() => setIsVideoLoading(false)}
                      onPlay={() => setIsPaused(false)}
                      onPause={() => setIsPaused(true)}
                    />
                  )}
                </div>
              </div>

              {/* Status Tag */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-full shadow-2xl border border-white/50 dark:border-white/10 flex items-center gap-2 whitespace-nowrap z-20">
                 <div className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
                 <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-300">
                    Live Session
                 </span>
              </div>
            </div>
          </div>

          {/* CONTENT COLUMN */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:justify-center lg:pb-12 min-w-0 w-full lg:max-w-lg">
            
            <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-slate-950 dark:text-white leading-tight tracking-tighter mb-8 whitespace-nowrap overflow-hidden text-ellipsis">
              {project.title}
            </h1>

            <div className="w-full space-y-4 max-w-[340px] sm:max-w-md lg:max-w-none">
              <div className="flex items-center gap-4 p-5 bg-white/60 dark:bg-white/[0.02] backdrop-blur-3xl rounded-2xl border border-white/40 dark:border-white/5 transition-all hover:bg-white/80 dark:hover:bg-white/[0.05] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0 border border-blue-500/10">
                  <Cpu size={18} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 mb-0.5">Software Stack</p>
                  <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200 truncate">
                    {project.category === 'Motion Graphics' ? 'Adobe AE & Premiere Pro' : 'Adobe Premiere Pro'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white/60 dark:bg-white/[0.02] backdrop-blur-3xl rounded-2xl border border-white/40 dark:border-white/5 transition-all hover:bg-white/80 dark:hover:bg-white/[0.05] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0 border border-emerald-500/10">
                  <User size={18} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 mb-0.5">Production House</p>
                  <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200 truncate">Digital Bhaiya Agency</p>
                </div>
              </div>

              <div className="pt-2 px-2 lg:px-0">
                <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed font-medium line-clamp-4 lg:line-clamp-none">
                  {project.description}
                </p>
              </div>

              <div className="pt-6">
                <a 
                  href={mailtoUrl}
                  className="group/wa relative overflow-hidden flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-2xl font-sans font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-[0.97] transition-all h-[64px]"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                  <Mail size={18} className="fill-white/10" />
                  <span>Hire Me Now</span>
                  <ArrowRight size={16} className="group-hover/wa:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-40">
               <div className="flex items-center gap-2">
                 <Sparkles size={12} className="text-blue-600 dark:text-blue-500" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 dark:text-white">Premium Content</span>
               </div>
               <div className="flex items-center gap-2">
                 <PenTool size={12} className="text-blue-600 dark:text-blue-500" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 dark:text-white">Archive 2026</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .group-hover\\/wa\\:animate-shimmer {
          animation: shimmer 2.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default ProjectPage;