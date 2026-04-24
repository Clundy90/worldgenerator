import React from "react";

interface RegionLayerProps {
  climate: string;
}

/**
 * REGION LAYER - WORLD-GLASS STAGE
 * Handles the ambient environmental atmosphere of the current sector.
 * Uses climate-specific color palettes and texture overlays.
 */
export const RegionLayer: React.FC<RegionLayerProps> = ({ climate }) => {
  const getAmbientStyles = () => {
    switch (climate) {
      case "Tundra":
        return "bg-slate-900 shadow-[inset_0_0_150px_rgba(30,58,138,0.6)]";
      case "Desert":
        return "bg-stone-950 shadow-[inset_0_0_150px_rgba(120,53,15,0.5)]";
      case "Jungle":
        return "bg-zinc-950 shadow-[inset_0_0_150px_rgba(6,78,59,0.4)]";
      default:
        return "bg-zinc-950";
    }
  };

  return (
    <div
      className={`absolute inset-0 z-0 transition-all duration-1000 ${getAmbientStyles()}`}
    >
      {/* Texture Overlay: Pinstripe grain for a technical feel */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

      {/* Moving Light Scan: A slow pulse representing the regional sensor sweep */}
      <div className="absolute inset-0 bg-linear-to-t from-cyan-500/5 to-transparent h-1/2 w-full animate-pulse top-0" />

      {/* Bottom Vignette for UI readability */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
    </div>
  );
};
