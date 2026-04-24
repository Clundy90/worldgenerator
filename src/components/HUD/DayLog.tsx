import React from "react";

interface DayLogProps {
  weather: string;
  severity: string;
  temp: string;
  effect: string;
}

/**
 * THE DAY LOG
 * A scrolling narrative ticker for current environmental status.
 */
export const DayLog: React.FC<DayLogProps> = ({
  weather,
  severity,
  temp,
  effect,
}) => {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">
          Atmospheric Log
        </h3>
        <span className="ml-auto text-[9px] font-mono text-zinc-500">
          [{timestamp}]
        </span>
      </div>

      <div className="space-y-4">
        <div className="border-l-2 border-orange-500/50 pl-4 py-1">
          <span className="text-[9px] text-orange-500 uppercase font-bold block mb-1">
            Environmental Scan
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed italic">
            Scanning reveals{" "}
            <span className="text-white font-bold">
              {severity} {weather}
            </span>
            . Local thermal readings stabilize at{" "}
            <span className="text-white">{temp}</span>.
          </p>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/20 p-3 rounded-lg">
          <span className="text-[9px] text-orange-400 uppercase font-bold block mb-1">
            Biological Impact
          </span>
          <p className="text-xs text-orange-200/70 font-mono">
            STATUS: {effect}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 ${i < 4 ? "bg-orange-500" : "bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
};
