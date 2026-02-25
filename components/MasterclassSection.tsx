
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Check, Sparkles, Play, Globe } from 'lucide-react';

interface MasterclassSectionProps {
  onNavigate: () => void;
}

const MasterclassSection: React.FC<MasterclassSectionProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-12 md:py-16 bg-[#f4f2ee] dark:bg-[#0b1120] transition-colors relative overflow-hidden border-t border-slate-200/50 dark:border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className={`max-w-4xl mx-auto px-6 sm:px-8 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="text-left">
            <h2 className="text-lg md:text-xl font-sans font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              YouTube Shorts Masterclass
            </h2>
          </div>
          <button 
            onClick={onNavigate}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-all font-sans font-medium text-[12px] tracking-tight hover:pl-1 active:scale-95"
          >
            Full syllabus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative group overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col md:flex-row items-stretch transition-all duration-500 hover:border-blue-500/20">
          
          <div className="w-full md:w-[40%] relative aspect-[16/9] md:aspect-auto overflow-hidden bg-slate-950 cursor-pointer" onClick={onNavigate}>
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEje5zjpHeCulGw1KkrLHeIMyL6LxIRq01aTTVDarBF0BQ3Om2oPPtb-988CqeNte8VaYLmQOB0Eg8_POo564tcDAbOwAmGEkbZbhQJe0lGWbHwVNQXdPArJdlgTpdDzdTSnsL7EyNPkClvZVaYkLntEnUJP2sAglsMhRMZF5u8JrwQ9hyD2iA0951xlqbA/s1075/ChatGPT%20Image%20Jan%2019,%202026,%2012_12_57%20AM.jpg" 
              alt="Masterclass Blueprint" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-[0.85] group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                <Play size={20} className="text-white fill-white ml-0.5" />
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-semibold tracking-tight shadow-lg">2026 Edition</span>
            </div>
          </div>

          <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col justify-center relative">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/5 border border-blue-600/10 w-fit">
                <Sparkles size={10} className="text-blue-500" />
                <span className="text-[10px] font-sans font-semibold text-blue-600 tracking-tight">7-Day system</span>
              </div>
              <h3 className="text-xl md:text-3xl font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-[1.2] max-w-sm">
                The Viral Content Framework.
              </h3>
              <div className="grid grid-cols-1 gap-y-2 pt-1">
                {["Step-by-step growth blueprint", "Verified creator strategies"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[12px] font-sans font-medium text-slate-600 dark:text-slate-400 tracking-tight">
                    <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Check size={9} className="text-blue-600 stroke-[3]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button onClick={onNavigate} className="group relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-sans font-semibold text-[13px] tracking-tight shadow-md shadow-blue-600/10 active:scale-95 transition-all">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                  Enroll Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4">
                   <div className="text-left font-sans">
                      <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">₹499</p>
                   </div>
                   <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10"></div>
                   <div className="flex items-center gap-2 text-slate-500 font-sans">
                      <Globe size={12} className="text-blue-500/50" />
                      <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap">Lifetime access</span>
                   </div>
                </div>
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

export default MasterclassSection;
