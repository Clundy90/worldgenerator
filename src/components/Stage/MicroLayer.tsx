import React from "react";

interface MicroLayerProps {
  inspectionData: {
    name: string;
    desc: string;
  } | null;
}

/**
 * MICRO LAYER - WORLD-GLASS STAGE
 * The deep-scan inspection mode.
 * Features a technical grid and data-readout aesthetics.
 */
export const MicroLayer: React.FC<MicroLayerProps> = ({ inspectionData }) => {
  return (
    <div className="absolute inset-0 z-0 bg-zinc-950 flex items-center justify-center">
      {/* Technical Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Viewfinder Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      </div>

      {/* Large background text for the inspected item */}
      {inspectionData && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03]">
          <h1 className="text-[30vw] font-black uppercase italic whitespace-nowrap">
            {inspectionData.name}
          </h1>
        </div>
      )}

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent h-20 w-full animate-scan" />

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};
