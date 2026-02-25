import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Video,
  Play,
  Zap,
  Users,
  FileText,
  Activity,
  ArrowLeft,
  TrendingUp,
  ShieldCheck as Shield,
  Loader2,
  CheckCircle2,
  Target,
  Gift,
  BookOpen,
  Globe,
  Sparkles,
  Award
} from 'lucide-react';

interface MasterclassPageProps {
  onBack: () => void;
  onSuccess?: () => void;
}

const RazorpayPaymentSection: React.FC<{ showPrice?: boolean; onSuccess?: () => void }> = ({ showPrice = true, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnroll = () => {
    if (isProcessing) return;
    
    if (!(window as any).Razorpay) {
      alert("Payment system is still loading. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);

    const email = "arhamadib31@gmail.com";
    const emailMessage = `Hello 👋\nI’ve successfully purchased the “YouTube Shorts Masterclass 2026” Masterclass (₹499).\nPlease let me know the next steps to proceed with customization and delivery.\nThank you 😊`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Masterclass Enrollment Success')}&body=${encodeURIComponent(emailMessage)}`;

    const options = {
      key: "rzp_live_Ry10eEbi20G6xG",
      amount: 499 * 100,
      currency: "INR",
      name: "Digital Bhaiya",
      description: "YouTube Shorts Masterclass 2026",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidyztfsXNJ8HrWFevcCoDfnwT6p6p8nDAJ_KGYR20OSC8q6E47hO0YIR7kEB2qKbv6IIdUBZF4QvyV0ALSLJfChLJK3P5GW-lNaAuG8TlDSumjZeog8EFdz7fbEj3W8utTPcKNSLpziTq8DlO_YmBzMauwf3uojz3vwpLXB3wUFEs6LLsBbMfWxYUmc_M/s2540/digital%20bhaiyaa..%20_20260116_000713_0000.png",
      handler: function (response: any) {
        setIsProcessing(false);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 100);
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#2563eb" },
      modal: { ondismiss: () => setIsProcessing(false) }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      {showPrice && (
        <div className="flex flex-col items-center gap-1 mb-1 font-sans">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">₹499</span>
            <span className="text-xs md:text-sm text-slate-400 line-through font-medium">₹1,699</span>
          </div>
          <div className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <span className="text-[11px] font-medium tracking-tight text-blue-600 dark:text-blue-500">Limited access • 70% off</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-2 w-full relative">
        <button 
          onClick={handleEnroll}
          disabled={isProcessing}
          className="group relative overflow-hidden w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-70 font-sans"
        >
          {/* Blue button: Constant slow 10s white shimmer */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
          {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} className="group-hover:scale-125 transition-transform" />}
          <span className="text-[13px] md:text-[14px] font-semibold tracking-tight">
            {isProcessing ? 'Verifying...' : 'Enroll now'}
          </span>
        </button>
        <div className="flex items-center gap-2 font-sans text-slate-400">
          <Shield size={10} className="text-emerald-500" />
          <span className="text-[10px] font-medium tracking-tight">Enterprise secured</span>
        </div>
      </div>
    </div>
  );
};

const ProofVideo: React.FC<{ url: string; title: string; views: string }> = ({ url, title, views }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative group bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl transition-all hover:border-blue-500/30">
      <div className="aspect-[9/18] relative cursor-pointer" onClick={togglePlay}>
        <video ref={videoRef} src={url} loop muted={!isPlaying} playsInline className="w-full h-full object-cover" />
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center transition-opacity group-hover:bg-slate-900/20">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
              <Play size={20} className="text-white fill-white ml-0.5" />
            </div>
            <p className="mt-2 text-[11px] font-sans font-medium text-white tracking-tight">Burst</p>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={10} className="text-emerald-400" />
            <span className="text-[11px] font-sans font-semibold text-emerald-400">{views}</span>
          </div>
          <h4 className="text-[12px] md:text-[13px] font-sans font-medium text-white tracking-tight leading-snug truncate">{title}</h4>
        </div>
      </div>
    </div>
  );
};

const MasterclassPage: React.FC<MasterclassPageProps> = ({ onBack, onSuccess }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const curriculumTimeline = [
    { stage: "01", title: "Strategy", desc: "Setting technical triggers for viral bursts.", points: ["Channel logic", "Niche math"], icon: <Target size={18} /> },
    { stage: "02", title: "Scripts", desc: "Master the 7-Day scroll-stopping hooks.", points: ["Hook formulas", "AI scripting"], icon: <FileText size={18} /> },
    { stage: "03", title: "Editing", desc: "Fast-cut visual storytelling for algorithm.", points: ["Visual pacing", "Mobile stack"], icon: <Video size={18} /> },
    { stage: "04", title: "Scaling", desc: "Consistent patterns for multi-channel success.", points: ["Trend logic", "Burst SEO"], icon: <TrendingUp size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-[#f1f0ec] dark:bg-slate-950 text-slate-900 dark:text-white pb-10 md:pb-20 overflow-x-hidden transition-colors selection:bg-blue-600 selection:text-white">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-5 pt-8 md:pt-10 mb-6 md:mb-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Standardized Header Section */}
      <div className="text-center mb-10 md:mb-14 flex flex-col gap-1 px-4 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1f2c] dark:text-white tracking-tight leading-tight">
          Shorts Masterclass
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-sans font-medium leading-relaxed opacity-80">
          The official 2026 growth roadmap for viral content strategy
        </p>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-0 pb-12 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 flex flex-col items-center">
          <div className="w-full max-w-6xl flex flex-col gap-8 md:gap-16">
            <div className="relative aspect-[18/9] w-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-slate-900 border-2 md:border-4 border-white dark:border-slate-800 shadow-2xl group/video cursor-pointer" onClick={() => !isPlaying && setIsPlaying(true)}>
              {!isPlaying ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                  <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEje5zjpHeCulGw1KkrLHeIMyL6LxIRq01aTTVDarBF0BQ3Om2oPPtb-988CqeNte8VaYLmQOB0Eg8_POo564tcDAbOwAmGEkbZbhQJe0lGWbHwVNQXdPArJdlgTpdDzdTSnsL7EyNPkClvZVaYkLntEnUJP2sAglsMhRMZF5u8JrwQ9hyD2iA0951xlqbA/s1075/ChatGPT%20Image%20Jan%2019,%202026,%2012_12_57%20AM.jpg" alt="Trailer" className="absolute inset-0 w-full h-full object-cover brightness-[0.5] transition-transform duration-[6s] group-hover/video:scale-110" />
                  <div className="relative z-10 w-16 h-16 md:w-28 md:h-28 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full flex items-center justify-center animate-pulse group-hover/video:scale-110 transition-transform">
                    <Play size={24} className="text-white fill-white ml-1 md:ml-1.5" />
                  </div>
                  <p className="absolute bottom-6 md:bottom-12 font-sans text-[11px] md:text-[13px] font-medium tracking-tight text-white/50">System overview</p>
                </div>
              ) : (
                <video ref={videoRef} src="https://files.catbox.moe/t0l7ir.mp4" className="w-full h-full object-cover" autoPlay onPlay={() => setIsPaused(false)} onPause={() => setIsPaused(true)} onClick={togglePlay} />
              )}
            </div>

            <div className="max-w-5xl mx-auto w-full bg-white dark:bg-slate-900/60 backdrop-blur-2xl p-6 md:p-16 rounded-[2.5rem] md:rounded-[4.5rem] border border-white dark:border-white/10 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-6 md:space-y-10">
                <div>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tighter leading-[1.1] mb-2 md:mb-6">
                    The <span className="text-blue-500 italic font-normal">2 Billion+</span> <br className="hidden md:block" /> Views Protocol.
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-sans text-[13px] md:text-[15px] font-medium leading-relaxed tracking-tight">Technical roadmap delivering the exact triggers I use to hit millions of views.</p>
                </div>
                <div className="space-y-3 md:space-y-5">
                  {[
                    "Proven 7-Day growth system",
                    "eBook + Full 6H premium vault",
                    "Verified 70+ students"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-5 text-[13px] md:text-[14px] font-sans font-medium text-slate-600 dark:text-slate-400 tracking-tight">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} className="text-blue-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 md:p-10 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-inner">
                <RazorpayPaymentSection onSuccess={onSuccess} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER NARRATIVE */}
      <section className="py-12 md:py-32 bg-white dark:bg-slate-950 border-y border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-5">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
              <div className="space-y-6 md:space-y-12 text-center lg:text-left">
                 <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                        <Award size={18} className="text-blue-600" />
                        <span className="text-[12px] font-sans font-medium text-blue-600 tracking-tight">The Founder</span>
                    </div>
                    <h2 className="text-3xl md:text-7xl font-serif font-black tracking-tighter leading-none">The <span className="text-blue-600 italic">Blueprint.</span></h2>
                    <p className="text-sm md:text-xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium opacity-80">
                        My technical framework has generated over 2 billion views. I help 70+ creators hit six-figure revenue using these exact systems.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-lg mx-auto lg:mx-0 font-sans">
                    {[
                       { label: "Views", val: "2B+" },
                       { label: "Students", val: "70+" },
                       { label: "Cycles", val: "7 Days" },
                       { label: "Revenue", val: "6 Fig" }
                    ].map((stat, i) => (
                       <div key={i} className="p-4 md:p-8 bg-[#f1f0ec] dark:bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 dark:border-white/10 text-center group hover:border-blue-500/30 transition-all">
                          <p className="text-[11px] font-medium text-slate-500 mb-1 group-hover:text-blue-500 transition-colors">{stat.label}</p>
                          <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none">{stat.val}</p>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-[4/5] max-w-sm mx-auto w-full rounded-[2.5rem] md:rounded-[5rem] overflow-hidden border-4 md:border-8 border-white dark:border-slate-800 shadow-xl">
                 <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhai4zRyvnaJySUfQuEpNk2_5swgbW8Y5ORrW71XgkZSXb1dl_umMBalTgUmgKTAr1hq0lx1iGd_SkXdWqS7ziDBPh4J1woEgs-ZOpGYsPjeCVWg-qomabYeAtafDKyQL0rcuHbfR1gunDI75QqlnvwibyXK999-87ZLnMDWahuySGAWxslsobOJsrDJm4/s964/play%20button%20(1).jpg" alt="Founder" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent"></div>
              </div>
           </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="py-12 md:py-32 bg-[#f1f0ec] dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-24 space-y-3">
             <h2 className="text-2xl md:text-6xl font-serif font-black text-slate-900 dark:text-white tracking-tighter leading-none">The <span className="text-blue-600 italic">Syllabus.</span></h2>
             <p className="text-[12px] md:text-sm font-sans text-slate-500 dark:text-slate-400 font-medium tracking-tight opacity-60">The 7-Day growth roadmap.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 font-sans">
            {curriculumTimeline.map((item, i) => (
              <div key={i} className="group p-6 md:p-12 bg-white dark:bg-slate-900/60 rounded-[2rem] md:rounded-[3.5rem] border border-slate-200 dark:border-white/5 transition-all hover:shadow-xl">
                <div className="flex justify-between items-start mb-6 md:mb-10">
                   <div className="p-4 md:p-6 rounded-[1.25rem] md:rounded-[1.75rem] bg-blue-600/10 text-blue-600 group-hover:scale-110 transition-transform">
                      {item.icon}
                   </div>
                   <span className="text-2xl md:text-4xl font-bold text-slate-100 dark:text-white/5">{item.stage}</span>
                </div>
                <h3 className="text-[14px] md:text-[16px] font-semibold text-slate-900 dark:text-white mb-2 md:mb-4 tracking-tight">{item.title}</h3>
                <p className="text-[12px] md:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium tracking-tight mb-4 md:mb-10">{item.desc}</p>
                <div className="space-y-2">
                  {item.points.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[12px] font-medium text-slate-400 tracking-tight">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                       {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF GRID */}
      <section className="py-12 md:py-32 bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-24 gap-6 md:gap-12 text-center md:text-left">
            <div className="space-y-3 md:space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Activity size={20} className="text-emerald-500" />
                <span className="text-[12px] font-sans font-medium text-emerald-500 tracking-tight">Live outcomes</span>
              </div>
              <h2 className="text-3xl md:text-7xl font-serif font-black text-slate-900 dark:text-white tracking-tighter leading-none">Real <span className="text-blue-600 italic">Magic.</span></h2>
              <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 font-sans max-w-xl font-medium leading-relaxed">Verified results from our 7-day protocol.</p>
            </div>
            <div className="flex items-center justify-center gap-6 p-5 md:p-8 bg-[#f1f0ec] dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-lg font-sans">
               <div className="text-right">
                  <p className="text-[14px] md:text-[16px] font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-1">2 Billion+</p>
                  <p className="text-[11px] font-medium text-slate-400 opacity-60">Views</p>
               </div>
               <div className="w-[1px] h-10 bg-slate-300 dark:bg-white/10"></div>
               <TrendingUp className="text-emerald-500" size={28} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
             <ProofVideo url="https://files.catbox.moe/5puyd3.mp4" title="Gaming" views="14M" />
             <ProofVideo url="https://files.catbox.moe/98xc4u.mp4" title="AI Story" views="8M" />
             <ProofVideo url="https://files.catbox.moe/86ph3d.mp4" title="Cinematic" views="25M" />
             <ProofVideo url="https://files.catbox.moe/def21b.mp4" title="Viral" views="11M" />
             <ProofVideo url="https://files.catbox.moe/6trsdj.mp4" title="Retention" views="9M" />
             <ProofVideo url="https://files.catbox.moe/lwwhsa.mp4" title="Narrative" views="31M" />
             <ProofVideo url="https://files.catbox.moe/et6zgr.mp4" title="Hook" views="15M" />
             <ProofVideo url="https://files.catbox.moe/38unth.mp4" title="Algorithm" views="22M" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-32 bg-slate-950 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-600/20 opacity-50"></div>
         <div className="max-w-5xl mx-auto px-5 text-center relative z-10 space-y-10 md:space-y-16">
            <h2 className="text-3xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-tight">Your Success <br /> Starts <span className="text-blue-500 italic">Now.</span></h2>
            <div className="max-w-md mx-auto">
               <div className="p-8 md:p-16 bg-white dark:bg-slate-900 rounded-[3.5rem] md:rounded-[5rem] shadow-2xl flex flex-col items-center border border-white/10">
                  <RazorpayPaymentSection onSuccess={onSuccess} />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default MasterclassPage;