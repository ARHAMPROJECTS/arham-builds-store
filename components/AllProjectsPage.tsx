import React, { useState, useMemo, useEffect } from 'react';
import { PROJECTS } from './Projects';
import { Search, Filter, ArrowLeft, X, Play, Share2 } from 'lucide-react';
import { Project } from '../types';

interface AllProjectsPageProps {
  onBack: () => void;
  onViewProject: (project: Project) => void;
}

const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ onBack, onViewProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(PROJECTS.map(p => p.category));
    return ['All Works', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All Works' || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleShare = async (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
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
        setShareFeedback(project.id);
        setTimeout(() => setShareFeedback(null), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f0ec] dark:bg-[#0b1120] py-6 md:py-12 transition-colors overflow-x-hidden no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Button - Small UI version */}
        <div className="w-full flex justify-start mb-6 md:mb-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Standardized Header - Reduced spacing */}
        <div className="text-center mb-10 md:mb-14 flex flex-col gap-1 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1f2c] dark:text-white tracking-tight leading-tight whitespace-nowrap">
            My Projects
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-sans font-normal leading-relaxed opacity-80">
            A showcase of cinematic archives and creative digital case studies
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="relative z-[60] mb-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex gap-2 h-[44px] md:h-[52px]">
            <div className="relative flex-1 group h-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} strokeWidth={1.5} />
              <input 
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-11 pr-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-gray-900 dark:text-white transition-all shadow-sm font-bold text-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`relative w-[44px] h-[44px] md:w-[52px] md:h-[52px] rounded-xl border transition-all flex items-center justify-center flex-shrink-0 ${
                isFilterOpen || activeCategory !== 'All Works'
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20' 
                : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-500 hover:border-blue-500/30'
              }`}
            >
              <Filter size={16} />
            </button>
          </div>

          {/* Categories Popover */}
          <div 
            className={`absolute top-full left-0 right-0 mt-3 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
              isFilterOpen 
                ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
            }`}
          >
            <div className="bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-2xl p-4 backdrop-blur-3xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                    className={`px-3 py-3 rounded-xl transition-all font-black text-center text-[8px] uppercase tracking-widest ${
                      activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 hover:border-blue-500/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in pb-24" style={{ animationDelay: '200ms' }}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => onViewProject(project)}
                className="group bg-white dark:bg-[#111827] rounded-[2rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer relative flex flex-col hover:-translate-y-2"
              >
                <div className="aspect-[9/16] relative overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Share Button Floating */}
                  <button 
                    onClick={(e) => handleShare(e, project)}
                    className="absolute top-4 right-4 z-30 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all active:scale-90"
                  >
                    <Share2 size={12} />
                    {shareFeedback === project.id && (
                      <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-blue-600 text-white text-[7px] font-black uppercase rounded shadow-lg animate-fade-in">Copied</span>
                    )}
                  </button>

                  {/* Minimal Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-500">
                      <Play className="text-white fill-white ml-0.5" size={16} />
                    </div>
                  </div>

                  {/* Tiny Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white text-[7px] font-black uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 md:p-5">
                  <h3 className="text-[10px] md:text-[11px] font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight mb-1 tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="text-[8px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest truncate opacity-60">
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-gray-50/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-100 dark:border-white/10 mb-24">
            <h3 className="text-lg font-serif font-black text-gray-900 dark:text-white mb-2">Empty Archives</h3>
            <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.4em] mb-8">Zero matches found</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All Works'); }}
              className="group relative overflow-hidden px-8 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[8px] shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              Reset Repository
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
      `}} />
    </div>
  );
};

export default AllProjectsPage;