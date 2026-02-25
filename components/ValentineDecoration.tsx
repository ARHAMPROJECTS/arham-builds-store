import React from 'react';
import { Heart } from 'lucide-react';

const ValentineDecoration: React.FC = () => {
  // Define some random elements to mimic the confetti in the image
  const elements = [
    { type: 'heart', color: 'text-pink-500', top: '10%', left: '5%', size: 24, rotate: 'rotate-12' },
    { type: 'dot', color: 'bg-red-400', top: '25%', left: '15%', size: 6 },
    { type: 'swirl', color: 'text-orange-500', top: '15%', left: '25%', size: 20, rotate: '-rotate-12' },
    { type: 'heart', color: 'text-rose-400', top: '5%', left: '35%', size: 18, rotate: '-rotate-45' },
    { type: 'dot', color: 'bg-purple-500', top: '30%', left: '45%', size: 8 },
    { type: 'swirl', color: 'text-pink-600', top: '20%', left: '55%', size: 22, rotate: 'rotate-45' },
    { type: 'heart', color: 'text-red-500', top: '12%', left: '65%', size: 28, rotate: 'rotate-12' },
    { type: 'dot', color: 'bg-orange-400', top: '28%', left: '75%', size: 10 },
    { type: 'swirl', color: 'text-purple-400', top: '8%', left: '85%', size: 24, rotate: '-rotate-12' },
    { type: 'heart', color: 'text-pink-400', top: '22%', left: '92%', size: 20, rotate: 'rotate-45' },
    // More elements for mobile density
    { type: 'dot', color: 'bg-pink-300', top: '40%', left: '10%', size: 5 },
    { type: 'heart', color: 'text-rose-500', top: '45%', left: '80%', size: 16 },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-32 overflow-hidden pointer-events-none z-0 opacity-60 dark:opacity-40 select-none">
      {elements.map((el, i) => (
        <div 
          key={i} 
          className="absolute transition-transform duration-1000"
          style={{ 
            top: el.top, 
            left: el.left,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite alternate`
          }}
        >
          {el.type === 'heart' && (
            <Heart 
              size={el.size} 
              className={`${el.color} ${el.rotate} fill-current`} 
            />
          )}
          {el.type === 'dot' && (
            <div 
              className={`${el.color} rounded-full`} 
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === 'swirl' && (
            <svg 
              width={el.size} 
              height={el.size} 
              viewBox="0 0 24 24" 
              fill="none" 
              className={`${el.color} ${el.rotate} stroke-current`}
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M12 2C12 2 15 5 15 9C15 13 9 13 9 17C9 21 12 24 12 24" />
            </svg>
          )}
        </div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-10px) rotate(5deg); }
        }
      `}} />
    </div>
  );
};

export default ValentineDecoration;