import React from "react";

interface MacroLayerProps {
  planet: string;
}

/**
 * MACRO LAYER - WORLD-GLASS STAGE
 * Provides the orbital perspective.
 * Displays a planetary silhouette and starfield background.
 */
export const MacroLayer: React.FC<MacroLayerProps> = ({ planet }) => {
  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden flex items-center justify-center">
      {/* Starfield Background */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Planetary Body: Large radial glow focused on the right side */}
      <div
        className="absolute -right-1/4 w-[120vh] h-[120vh] rounded-full 
                      bg-linear-to-l from-cyan-900/20 via-zinc-900 to-transparent 
                      blur-3xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)]"
      />

      {/* Orbital Ring Decal */}
      <div className="absolute w-[150%] h-px bg-white/5 rotate-12 top-1/2" />

      {/* HUD Label for Macro Mode */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <p className="text-[100px] font-black text-white leading-none tracking-tighter uppercase italic select-none">
          {planet}
        </p>
      </div>
    </div>
  );
};
