import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Zap, ShieldCheck, RefreshCcw, Info, Calendar, HelpCircle, MessageCircle, Minus } from 'lucide-react';

const FAQ_ITEMS = [
  {
    icon: <Info className="w-4 h-4" />,
    question: "How does the process work?",
    answer: "The workflow is simple: Choose your template, complete the secure checkout, and share your receipt on WhatsApp. We then provide a simple form for your images/text, and our team deploys your live site within 12-24 hours."
  },
  {
    icon: <Zap className="w-4 h-4" />,
    question: "What is the delivery timeline?",
    answer: "Efficiency is our priority. We guarantee delivery within a 12 to 24-hour window starting from the moment you submit your customization requirements."
  },
  {
    icon: <Calendar className="w-4 h-4" />,
    question: "How long is hosting active?",
    answer: "Standard hosting is provided for 2 months. If you need a permanent URL or an extension, simply request it via email or WhatsApp and we will provide a custom quote."
  },
  {
    icon: <RefreshCcw className="w-4 h-4" />,
    question: "What is your refund policy?",
    answer: "As digital assets are delivered instantly, all sales are final. However, we offer a 100% refund guarantee if we fail to meet our 24-hour delivery commitment."
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    question: "Is my personal data safe?",
    answer: "Completely. Your photos and text are used only for deployment. We purge all client media from our production servers once the hosting period concludes."
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    question: "Do I need any technical skills?",
    answer: "Zero. We handle all the coding, server setup, and deployment. You only need to provide the content you want to see on your site."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={sectionRef} className="pt-6 pb-12 bg-transparent transition-colors relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className={`flex flex-col items-center mb-10 transition-all duration-1000 ease-out transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className={`h-[2px] bg-blue-600 rounded-full mt-3 transition-all duration-1000 delay-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] ${isVisible ? 'w-16' : 'w-0'}`}></div>
        </div>

        <div className="grid grid-cols-1 gap-3 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`group bg-white dark:bg-white/[0.03] rounded-[1.5rem] border transition-all duration-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                } ${
                  isOpen 
                    ? 'border-blue-500/40 shadow-xl shadow-blue-600/5 ring-1 ring-blue-500/10 scale-[1.01]' 
                    : 'border-gray-200/50 dark:border-white/5 hover:border-blue-500/30 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl transition-all duration-500 flex items-center justify-center shrink-0 ${
                      isOpen 
                        ? 'bg-blue-600 text-white shadow-lg rotate-[360deg]' 
                        : 'bg-[#F1F0EC] dark:bg-white/5 text-gray-400 group-hover:bg-blue-600/10 group-hover:text-blue-600'
                    }`}>
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 14 })}
                    </div>
                    <span className={`text-[13px] font-bold tracking-tight transition-colors leading-snug ${
                      isOpen 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`ml-4 flex-shrink-0 transition-all duration-500 ${
                    isOpen ? 'rotate-180 text-blue-600 scale-110' : 'rotate-0 text-gray-400'
                  }`}>
                    {isOpen ? <Minus size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>
                
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pl-[60px]">
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[12px] font-medium font-sans opacity-90">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div 
            style={{ transitionDelay: `${FAQ_ITEMS.length * 50}ms` }}
            className={`mt-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="bg-white dark:bg-white/[0.03] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center text-center md:text-left gap-8 border border-gray-100 dark:border-white/5 transition-all hover:shadow-2xl shadow-xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 flex-1">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110">
                    <MessageCircle size={28} className="fill-white/10" />
                    {/* Notification Dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-[#0b1120] animate-bounce"></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Need specific help?</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md mx-auto md:mx-0 opacity-80">
                    Our technical support is active 24/7. Connect directly with the founder for priority assistance.
                  </p>
                </div>
              </div>

              <a 
                href="mailto:arhamadib31@gmail.com" 
                className="group relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0b1120] dark:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shrink-0"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                <HelpCircle size={16} />
                Support Center
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default FAQ;