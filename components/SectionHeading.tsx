
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-8 md:mb-12 ${align === 'center' ? 'text-center' : 'text-left'} flex flex-col items-${align === 'center' ? 'center' : 'start'} gap-5 px-4`}>
      <div className="flex flex-col items-center group">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1a1f2c] dark:text-white tracking-tight leading-tight">
          {title}
        </h2>
        {/* Thinner Premium Pill Underline with Gradient and Glow */}
        <div className="h-[2px] w-32 md:w-48 bg-gradient-to-r from-blue-400/60 to-blue-600/80 rounded-full mt-3 transition-all duration-700 group-hover:w-40 md:group-hover:w-56 shadow-[0_2px_10px_rgba(59,130,246,0.2)]"></div>
      </div>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 text-[13px] md:text-base font-sans font-normal leading-relaxed opacity-80 max-w-2xl mx-auto md:mx-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
