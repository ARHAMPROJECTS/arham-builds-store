import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface CustomVideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoUrl, thumbnailUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setIsPaused(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative group">
      {/* Video Player Frame */}
      <div 
        className="aspect-video rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-white/5 shadow-2xl relative z-10 bg-black cursor-pointer group/video"
        onClick={togglePlay}
      >
        {!isPlaying && (
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.9] group-hover/video:brightness-100 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        )}
        
        <video 
          ref={videoRef}
          src={videoUrl} 
          className={`w-full h-full object-cover brightness-[0.9] group-hover/video:brightness-100 transition-all duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} 
          loop
          muted={isMuted}
          playsInline
          onPlay={() => { setIsPlaying(true); setIsPaused(false); }}
          onPause={() => setIsPaused(true)}
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
              <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Video Preview</span>
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
  );
};

export default CustomVideoPlayer;
