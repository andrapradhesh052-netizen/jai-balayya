import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import NeonBackground from './components/NeonBackground';
import { Cpu, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 gap-8">
      <NeonBackground />

      {/* Header / Logo */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 py-4"
      >
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-neon-magenta rounded-xl flex items-center justify-center neon-glow-magenta rotate-3 group-hover:rotate-0 transition-transform">
            <Cpu size={28} className="text-black" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-display font-black tracking-tighter text-white leading-none">
              NEON<span className="text-neon-cyan">CORE</span>
            </h1>
            <span className="text-[10px] font-mono text-neon-magenta uppercase tracking-[0.3em]">Neural Interface v0.92</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest hidden md:flex">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse" />
            <span>Server: Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-neon-cyan" />
            <span>Sync: Active</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content Grid */}
      <main className="w-full max-w-6xl flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 relative">
        
        {/* Left Side (Optional Stats/Info) - Hidden on smaller screens or used for spacing */}
        <div className="hidden xl:flex flex-col gap-6 w-[200px] shrink-0 pt-12">
          <div className="flex flex-col gap-1 border-l-2 border-neon-cyan pl-4 py-2">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Current Wave</span>
            <span className="text-xl font-display font-bold text-white">SYNTHWAVE</span>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-4 py-2">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Network Load</span>
            <span className="text-lg font-mono text-neon-lime">14.2 GB/S</span>
          </div>
        </div>

        {/* Center: Snake Game */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="z-10"
        >
          <SnakeGame />
        </motion.div>

        {/* Right: Music Player */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="z-10 self-center lg:self-start lg:mt-24"
        >
          <MusicPlayer />
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-1 pointer-events-none hidden lg:block" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5 -z-1 pointer-events-none hidden lg:block" />
      </main>

      {/* Footer Branding */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full flex items-center justify-center p-4 border-t border-white/5"
      >
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] text-center">
          Designed by Neural Network &middot; AI Studio Production &middot; 2024
        </p>
      </motion.footer>
    </div>
  );
}
