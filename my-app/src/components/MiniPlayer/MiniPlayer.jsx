import React, { useState } from 'react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MiniPlayer = () => {
  const {
    currentPodcast,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlayPause,
    seekTo,
    changeVolume,
    toggleMute,
    closePlayer,
  } = useAudioPlayer();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  if (!currentPodcast) return null;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    seekTo(percentage * duration);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* SVG Filters for Liquid Glass Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* Gooey/Liquid Effect */}
          <filter id="liquid-glass-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          
          {/* Glass Distortion with Animation */}
          <filter id="glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.008 0.004" 
              numOctaves="3" 
              result="turbulence"
              seed="2"
            >
              <animate
                attributeName="baseFrequency"
                dur="20s"
                values="0.008 0.004;0.012 0.006;0.008 0.004"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="turbulence" 
              scale="35" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="displacement"
            >
              <animate
                attributeName="scale"
                dur="15s"
                values="35;50;35"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            <feGaussianBlur in="displacement" stdDeviation="1" result="blur" />
          </filter>

          {/* Enhanced Glass with Chromatic Aberration */}
          <filter id="glass-refraction" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
            <feOffset in="SourceGraphic" dx="1" dy="1" result="offsetR" />
            <feOffset in="SourceGraphic" dx="-1" dy="-1" result="offsetB" />
            <feBlend in="offsetR" in2="offsetB" mode="screen" result="blend" />
            <feMorphology operator="dilate" radius="0.5" in="blend" result="dilate" />
            <feComposite in="SourceGraphic" in2="dilate" operator="over" />
          </filter>
        </defs>
      </svg>

      <div className="fixed bottom-0 left-0 right-0 z-[9999] liquid-glass-player">
        {/* Liquid Glass Container with rounded corners */}
        <div className="relative mx-4 mb-3 rounded-[24px] overflow-visible">
          {/* Animated Gradient Background Layer */}
          <div 
            className="absolute inset-0 -z-10 rounded-[24px]"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.5), rgba(217, 119, 6, 0.4), rgba(251, 146, 60, 0.5), rgba(251, 191, 36, 0.4))',
              backgroundSize: '400% 400%',
              filter: 'blur(20px)',
              animation: 'gradientShift 8s ease infinite',
            }}
          ></div>

          {/* Main Glass Container */}
          <div className="relative rounded-[24px] overflow-hidden">
            {/* Animated Gradient Background for whole mini player */}
            <div 
              className="absolute inset-0 rounded-[24px]"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.4), rgba(217, 119, 6, 0.3), rgba(251, 146, 60, 0.4), rgba(251, 191, 36, 0.3))',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease infinite',
              }}
            ></div>

            {/* Distorted Backdrop */}
            <div 
              className="absolute inset-0 rounded-[24px]"
              style={{
                backdropFilter: 'blur(80px) saturate(200%) contrast(130%)',
                WebkitBackdropFilter: 'blur(80px) saturate(200%) contrast(130%)',
              }}
            ></div>

            {/* Glass Background with Blur */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-gray-900/50 to-gray-800/30 rounded-[24px]"
              style={{
                mixBlendMode: 'multiply',
              }}
            ></div>
            
            {/* Inner Shadow Border with Glow */}
            <div 
              className="absolute inset-0 rounded-[24px] pointer-events-none"
              style={{
                boxShadow: `
                  inset 3px 3px 0px -2px rgba(255, 255, 255, 0.8),
                  inset 0 0 4px 2px rgba(255, 255, 255, 0.6),
                  inset 0 0 20px 5px rgba(251, 191, 36, 0.1),
                  0 8px 32px rgba(0, 0, 0, 0.4)
                `,
              }}
            ></div>
            
            {/* Top Edge Glow with Animation */}
            <div 
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-[24px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            ></div>
            
            {/* Frosted Glass Overlay with Refraction */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-transparent rounded-[24px]"
              style={{
                filter: 'url(#glass-refraction)',
              }}
            ></div>
            
            {/* Noise Texture for Glass Effect */}
            <div 
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay rounded-[24px]" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px'
              }}
            ></div>

            {/* Content Container */}
            <div className="relative px-4 py-3">
            {/* Curved Progress Bar */}
            <div className="relative overflow-hidden -mx-4 -mt-3 mb-3">
              <div
                className="h-1 bg-white/10 cursor-pointer hover:h-1.5 transition-all group relative"
                onClick={handleProgressClick}
              >
              {/* Progress Fill with Gradient */}
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 relative transition-all shadow-lg shadow-amber-500/30"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                
                {/* Thumb */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-amber-500/50 ring-2 ring-amber-400/30"></div>
              </div>
              
              {/* Glow Effect */}
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-amber-500/50 to-orange-500/50 blur-sm transition-all"
                style={{ width: `${progress}%` }}
              ></div>
              </div>
            </div>

            <div className="flex items-center justify-between max-w-screen-2xl mx-auto gap-6">
              {/* Left: Podcast Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Link to={`/podcast/${currentPodcast.id}`} className="flex-shrink-0 group">
                  <div className="relative glass-element">
                    {/* Glass Frame with iOS effect */}
                    <div 
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      style={{
                        boxShadow: 'inset 2px 2px 0px -2px rgba(255, 255, 255, 0.7), inset 0 0 3px 1px rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    ></div>
                    <img
                      src={currentPodcast.imageUrl}
                      alt={currentPodcast.title}
                      className="relative w-12 h-12 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform border border-white/30"
                    />
                    {/* Top Reflection */}
                    <div 
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      }}
                    ></div>
                  </div>
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/podcast/${currentPodcast.id}`}
                    className="text-white text-sm font-semibold hover:text-amber-400 transition-colors truncate block text-shadow-lg"
                  >
                    {currentPodcast.title}
                  </Link>
                  <p className="text-gray-300 text-xs truncate">
                    {currentPodcast.author || 'Unknown Artist'}
                  </p>
                </div>
                <button className="text-gray-300 hover:text-amber-400 transition-colors flex-shrink-0 hover:scale-110 transform transition-transform">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Center: Player Controls */}
              <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl px-6">
                <div className="flex items-center gap-4">
                  <button className="text-gray-300 hover:text-white transition-all hover:scale-110 transform">
                    <SkipBack className="w-4 h-4" fill="currentColor" />
                  </button>
                  
                  {/* Glass Play Button with iOS effect */}
                  <button
                    onClick={togglePlayPause}
                    className="relative w-10 h-10 flex items-center justify-center rounded-full group glass-button"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {/* Inner Glass Layer */}
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: 'inset 2px 2px 0px -2px rgba(255, 255, 255, 0.8), inset 0 0 3px 1px rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    ></div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white relative z-10 drop-shadow-lg" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5 relative z-10 drop-shadow-lg" fill="currentColor" />
                    )}
                    
                    {/* Top Reflection */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      }}
                    ></div>
                  </button>
                  
                  <button className="text-gray-300 hover:text-white transition-all hover:scale-110 transform">
                    <SkipForward className="w-4 h-4" fill="currentColor" />
                  </button>
                </div>

                {/* Time and Progress */}
                <div className="flex items-center gap-3 w-full">
                  <span className="text-xs text-gray-300 font-medium w-12 text-right tabular-nums">
                    {formatTime(currentTime)}
                  </span>
                  <div 
                    className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer group relative overflow-hidden backdrop-blur-sm"
                    onClick={handleProgressClick}
                  >
                    {/* Progress Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-sm"></div>
                    
                    <div
                      className="relative h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all shadow-lg shadow-amber-500/30"
                      style={{ width: `${progress}%` }}
                    >
                      {/* Shimmer on progress bar */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-shimmer"></div>
                      
                      {/* Hover Thumb */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl shadow-amber-500/50 ring-4 ring-amber-400/30 backdrop-blur-sm"></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium w-12 tabular-nums">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Right: Volume & Actions */}
              <div className="flex items-center gap-4 flex-1 justify-end">
                <Link
                  to={`/podcast/${currentPodcast.id}`}
                  className="text-gray-300 hover:text-amber-400 transition-all hover:scale-110 transform"
                  title="Expand Player"
                >
                  <Maximize2 className="w-5 h-5" />
                </Link>

                {/* Volume Control with Glass Effect */}
                <div
                  className="flex items-center gap-2 relative"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button
                    onClick={toggleMute}
                    className="text-gray-300 hover:text-white transition-all hover:scale-110 transform"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  
                  {/* Glass Volume Slider with iOS effect */}
                  {showVolumeSlider && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all animate-slide-up">
                      {/* Glass Container with rounded corners */}
                      <div 
                        className="relative rounded-3xl p-5 shadow-2xl"
                        style={{
                          background: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(60px) saturate(200%)',
                          WebkitBackdropFilter: 'blur(60px) saturate(200%)',
                          boxShadow: 'inset 2px 2px 0px -2px rgba(255, 255, 255, 0.6), inset 0 0 3px 1px rgba(255, 255, 255, 0.4), 0 20px 40px rgba(0,0,0,0.4)',
                        }}
                      >
                        {/* Top Glow */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl"></div>
                        
                        {/* Frosted Overlay */}
                        <div 
                          className="absolute inset-0 rounded-3xl pointer-events-none"
                          style={{
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          }}
                        ></div>
                        
                        <div className="relative flex flex-col items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => changeVolume(parseFloat(e.target.value))}
                            className="w-32 h-32 appearance-none bg-transparent cursor-pointer volume-slider-vertical"
                            orient="vertical"
                            style={{
                              writingMode: 'bt-lr',
                              WebkitAppearance: 'slider-vertical',
                            }}
                          />
                          <span className="text-xs text-white font-semibold drop-shadow-lg">
                            {Math.round((isMuted ? 0 : volume) * 100)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Arrow with glass effect */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                        <div 
                          className="w-4 h-4 rotate-45"
                          style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            borderBottom: '1px solid rgba(255,255,255,0.2)',
                            borderRight: '1px solid rgba(255,255,255,0.2)',
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={closePlayer}
                  className="text-gray-300 hover:text-red-400 transition-all hover:scale-110 transform"
                  title="Close Player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          {/* Close Main Glass Container */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniPlayer;
