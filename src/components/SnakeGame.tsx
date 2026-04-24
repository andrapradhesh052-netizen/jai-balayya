import { useSnake } from '../hooks/useSnake';
import { GRID_SIZE } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, Pause, RotateCcw } from 'lucide-react';

export default function SnakeGame() {
  const { snake, food, score, isGameOver, isPaused, setIsPaused, resetGame } = useSnake();

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-dark-panel/80 backdrop-blur-xl border border-white/5 rounded-3xl neon-glow-cyan">
      <div className="w-full flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-neon-cyan uppercase tracking-widest font-mono opacity-80">Mission Parameters</span>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            NEON SLITHER
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
            <Trophy size={16} className="text-neon-lime" />
            <span className="font-mono text-xl text-neon-lime">{score}</span>
          </div>
        </div>
      </div>

      <div 
        className="relative bg-black/60 rounded-xl overflow-hidden border border-white/10"
        style={{ 
          width: 'min(80vw, 400px)', 
          aspectRatio: '1/1',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake Body */}
        {snake.map((segment, index) => (
          <motion.div
            key={`${segment[0]}-${segment[1]}-${index}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`
              ${index === 0 ? 'bg-neon-cyan neon-glow-cyan z-10' : 'bg-neon-cyan/40 scale-95'} 
              rounded-sm
            `}
            style={{
              gridColumnStart: segment[0] + 1,
              gridRowStart: segment[1] + 1,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="bg-neon-magenta rounded-full neon-glow-magenta"
          style={{
            gridColumnStart: food[0] + 1,
            gridRowStart: food[1] + 1,
          }}
        />

        {/* Overlays */}
        <AnimatePresence>
          {(isPaused || isGameOver) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
            >
              {isGameOver ? (
                <>
                  <motion.h3 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-display font-bold text-neon-magenta mb-2"
                  >
                    GAME OVER
                  </motion.h3>
                  <p className="text-white/60 mb-8 font-mono text-sm">System integrity failure. Final score: {score}</p>
                  <button 
                    onClick={resetGame}
                    className="group bg-neon-cyan text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all transform active:scale-95"
                  >
                    <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    REINITIALIZE
                  </button>
                </>
              ) : (
                <>
                  <motion.h3 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-display font-bold text-white mb-8"
                  >
                    PAUSED
                  </motion.h3>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="bg-neon-cyan text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all transform active:scale-95"
                  >
                    <Play size={20} fill="black" />
                    RESUME
                  </button>
                  <p className="mt-8 text-white/40 text-xs font-mono uppercase tracking-[0.2em]">Press SPACE to toggle</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex justify-between gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest bg-white/5 py-2 px-4 rounded-lg">
        <span>Controls: Arrow Keys</span>
        <span>Pause: Space</span>
      </div>
    </div>
  );
}
