import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Music } from 'lucide-react';
import { TRACKS } from '../constants';
import { Track } from '../types';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showList, setShowList] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[350px] bg-dark-panel/90 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 neon-glow-magenta relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-magenta/10 rounded-full blur-3xl pointer-events-none" />
      
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-neon-magenta">
          <Music size={16} />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Neural Audio Unit</span>
        </div>
        <button 
          onClick={() => setShowList(!showList)}
          className={`p-2 rounded-lg transition-colors ${showList ? 'bg-neon-magenta text-black' : 'text-white/40 hover:text-white'}`}
        >
          <ListMusic size={18} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showList ? (
          <motion.div 
            key="player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-4 items-center">
              <motion.div 
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 shrink-0"
              >
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-lg font-display font-bold text-white truncate">{currentTrack.title}</h3>
                <p className="text-sm text-neon-magenta/70 font-mono tracking-tight truncate">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-neon-magenta to-neon-cyan"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase">
                <span>Direct Feed</span>
                <span>AI Core v2.4</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8">
              <button 
                onClick={skipBackward}
                className="text-white/60 hover:text-neon-magenta transition-colors hover:scale-110 active:scale-95"
              >
                <SkipBack size={24} />
              </button>
              <button 
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-neon-magenta hover:text-white transition-all transform active:scale-90 neon-glow-magenta"
              >
                {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={skipForward}
                className="text-white/60 hover:text-neon-magenta transition-colors hover:scale-110 active:scale-95"
              >
                <SkipForward size={24} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-2"
          >
            {TRACKS.map((track, index) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(true);
                }}
                className={`flex gap-3 items-center p-3 rounded-xl transition-all ${
                  currentTrackIndex === index 
                    ? 'bg-neon-magenta/20 border border-neon-magenta/30 shadow-lg shadow-neon-magenta/10' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex flex-col items-start min-w-0">
                  <span className={`text-sm font-bold truncate ${currentTrackIndex === index ? 'text-neon-magenta' : 'text-white'}`}>
                    {track.title}
                  </span>
                  <span className="text-[10px] text-white/40 truncate uppercase font-mono">{track.artist}</span>
                </div>
                {currentTrackIndex === index && isPlaying && (
                  <div className="ml-auto flex gap-0.5 items-end h-3">
                    {[0, 1, 2].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        className="w-0.5 bg-neon-magenta"
                      />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <Volume2 size={16} className="text-white/40" />
        <div className="h-1 flex-1 bg-white/5 rounded-full">
          <div className="h-full w-2/3 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
