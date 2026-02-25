
import React, { useRef, useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import { Project } from '../types';
import { Play, ChevronLeft, ChevronRight, ArrowRight, LayoutGrid } from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'viral-shorts-strategy',
    title: 'Viral Shorts Strategy',
    description: 'A technical breakdown of viral growth mechanics and algorithm triggers.',
    thumbnailUrl: 'https://img.youtube.com/vi/9mapkW3Ykpg/hqdefault.jpg',
    category: 'Strategy',
    videoUrl: 'https://www.youtube.com/shorts/9mapkW3Ykpg'
  },
  {
    id: '2',
    slug: 'cinematic-vfx-showcase',
    title: 'Cinematic VFX Showcase',
    description: 'High-impact visual effects designed for maximum audience retention.',
    thumbnailUrl: 'https://img.youtube.com/vi/xnGtm8gTwrQ/hqdefault.jpg',
    category: 'Motion Graphics',
    videoUrl: 'https://www.youtube.com/shorts/xnGtm8gTwrQ'
  },
  {
    id: '3',
    slug: 'editing-mastery-breakdown',
    title: 'Editing Mastery Breakdown',
    description: 'Fast-paced editing style that dominates the YouTube Shorts feed.',
    thumbnailUrl: 'https://img.youtube.com/vi/9mapkW3Ykpg/hqdefault.jpg',
    category: 'VFX',
    videoUrl: 'https://www.youtube.com/shorts/9mapkW3Ykpg'
  }
];

interface ProjectsProps {
  onViewProject: (project: Project) => void;
  onExploreAll?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewProject, onExploreAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

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

  const handleScroll = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollLeft > 20) {
      setShowScrollHint(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setShowScrollHint(false);
    }
  };

  return (
    <div ref={sectionRef} id="projects-section" className="py-16 md:py-24 bg-[#f4f2ee] dark:bg-[#0b1120] transition-colors overflow-hidden relative border-t border-gray-100 dark:border-white/5">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="relative mb-8 md:mb-12">
          <SectionHeading 
            title="Recent Projects" 
            subtitle="Archive of high-impact visual storytelling and growth experiments." 
            align="center" 
          />
          
          <div 
            className={`hidden md:flex absolute right-0 bottom-0 items-center gap-2 transition-all duration-1000 cursor-pointer group ${
              showScrollHint ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
            onClick={() => scroll('right')}
          >
             <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors">
               Scroll
             </span>
             <div className="flex items-center text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transition-colors">
                <ArrowRight size={14} className="animate-bounce-x-subtle" />
             </div>
          </div>
        </div>

        <div className="relative group mb-12">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 bg-white dark:bg-[#111827] p-3 rounded-full shadow-xl border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all hidden md:flex items-center justify-center hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 bg-white dark:bg-[#111827] p-3 rounded-full shadow-xl border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all hidden md:flex items-center justify-center hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 snap-x snap-mandatory scroll-smooth"
          >
            {PROJECTS.map((project, index) => (
              <a 
                key={project.id}
                href={`/projects/${project.slug}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onViewProject(project);
                  }
                }}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`flex-shrink-0 w-52 sm:w-[260px] bg-white dark:bg-[#111827] rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer snap-center relative group/card border border-gray-100 dark:border-white/5 no-underline block ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-200">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center transform scale-75 group-hover/card:scale-100 transition-all duration-500">
                      <Play className="text-white fill-white ml-0.5" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[9px] font-sans font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-1 block">
                    {project.category}
                  </span>
                  <h3 className="text-[14px] font-sans font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px] font-sans line-clamp-2 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {onExploreAll && (
          <div className="flex justify-center pt-4">
            <button 
              onClick={onExploreAll}
              className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-gray-950 dark:bg-white text-white dark:text-black rounded-2xl font-sans font-semibold text-[13px] tracking-tight transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <LayoutGrid size={16} />
              Explore all works
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .group-hover\\:animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
        @keyframes bounce-x-subtle {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .animate-bounce-x-subtle {
          animation: bounce-x-subtle 1.2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Projects;
