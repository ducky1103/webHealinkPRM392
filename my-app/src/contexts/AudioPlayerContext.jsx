import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Play podcast
  const playPodcast = (podcast) => {
    setCurrentPodcast(podcast);
    setIsPlaying(true);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Seek to specific time
  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Change volume
  const changeVolume = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Stop playback
  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Close player
  const closePlayer = () => {
    stopPlayback();
    setCurrentPodcast(null);
  };

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentPodcast]);

  // Auto play when podcast changes
  useEffect(() => {
    if (currentPodcast && audioRef.current) {
      const isNewPodcast = audioRef.current.src !== currentPodcast.audioUrl;
      
      if (isNewPodcast) {
        // Load new podcast
        audioRef.current.load();
      }
      
      // Play if isPlaying is true
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playing successfully');
            })
            .catch(err => {
              console.error('Playback error:', err);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [currentPodcast, isPlaying]);

  const value = {
    currentPodcast,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    audioRef,
    playPodcast,
    togglePlayPause,
    seekTo,
    changeVolume,
    toggleMute,
    stopPlayback,
    closePlayer,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      {/* Hidden audio element */}
      {currentPodcast && (
        <audio
          ref={audioRef}
          src={currentPodcast.audioUrl}
          preload="metadata"
        />
      )}
    </AudioPlayerContext.Provider>
  );
};
