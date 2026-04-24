import React from "react";

interface CompassProps {
  planet: string;
  mythology: string;
}

/**
 * THE COMPASS
 * Provides sector coordinates and planetary orientation.
 */
export const Compass: React.FC<CompassProps> = ({ planet, mythology }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-2xl relative overflow-hidden group">
      {/* Decorative scanning line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-20 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
            Navigation
          </h3>
          <p className="text-xl font-bold text-white tracking-tighter italic uppercase">
            {planet}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-zinc-600 block uppercase">
            Sector Origin
          </span>
          <span className="text-[10px] text-zinc-400 font-mono uppercase">
            {mythology}
          </span>
        </div>
      </div>

      {/* The Visual "Compass" Ring */}
      <div className="relative w-full aspect-square flex items-center justify-center border border-white/5 rounded-full mb-4">
        <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="text-[8px] text-zinc-700 font-mono">
          <div className="absolute top-2 left-1/2 -translate-x-1/2">N</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">S</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2">W</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2">E</div>
        </div>
        <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]" />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="bg-white/5 p-2 rounded border border-white/5">
          <span className="text-[8px] text-zinc-500 block uppercase">Lat</span>
          <span className="text-[10px] text-white font-mono">42.08.12</span>
        </div>
        <div className="bg-white/5 p-2 rounded border border-white/5">
          <span className="text-[8px] text-zinc-500 block uppercase">Long</span>
          <span className="text-[10px] text-white font-mono">19.04.88</span>
        </div>
      </div>
    </div>
  );
};
