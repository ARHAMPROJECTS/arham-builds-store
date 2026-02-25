import React, { useEffect, useState, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { Video, Layout, Youtube, PenTool } from 'lucide-react';
import { Skill } from '../types';

const Expertise: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: "Professional Video Editing", percentage: 95, icon: <Video size={18} /> },
    { name: "Content Creation (Multiple Channels)", percentage: 92, icon: <Youtube size={18} /> },
    { name: "Web Design", percentage: 90, icon: <Layout size={18} /> },
    { name: "Graphic Design", percentage: 88, icon: <PenTool size={18} /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id="expertise" className="py-20 md:py-32 bg-[#F1F0EC] dark:bg-[#0b1120] transition-colors relative overflow-hidden scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <SectionHeading 
            title="My Expertise" 
            subtitle="Precision-crafted solutions engineered for the modern digital landscape." 
          />
        </div>

        <div className="grid grid-cols-1 gap-y-12 md:gap-y-16 mt-16 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className={`flex flex-col gap-5 transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Reference-Matched Header: Icon, Name, and Proficiency Badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl text-blue-600 dark:text-blue-500 flex items-center justify-center border border-gray-100 dark:border-white/10 shadow-sm transition-all group-hover:shadow-md">
                    {skill.icon}
                  </div>
                  <h3 className="font-sans font-bold text-base md:text-xl text-gray-900 dark:text-white tracking-tight">
                    {skill.name}
                  </h3>
                </div>
                
                {/* Proficiency Badge Styled exactly like reference */}
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-600/10 rounded-full border border-blue-100/50 dark:border-blue-500/10 flex-shrink-0">
                  <span className="text-[9px] md:text-[10px] font-sans font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] whitespace-nowrap">
                    {skill.percentage}% PROFICIENCY
                  </span>
                </div>
              </div>
              
              {/* Reference-Matched Progress Bar (Solid Blue Thin Line) */}
              <div className="relative w-full h-[3px] bg-gray-200/40 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ 
                    width: isVisible ? `${skill.percentage}%` : '0%',
                    transitionDelay: `${index * 100 + 400}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;