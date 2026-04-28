import React from "react";
import { RefreshCcw, ScrollText } from "lucide-react";
import type { NameSeeds } from "../../data/nameSeeds";

interface NameSeedsCardProps {
  seeds: NameSeeds | null;
  onReroll: () => void;
}

export const NameSeedsCard: React.FC<NameSeedsCardProps> = ({
  seeds,
  onReroll,
}) => {
  const rows = seeds
    ? [
        { label: "Settlement", value: seeds.settlement },
        { label: "Tavern", value: seeds.tavern },
        { label: "Landmark", value: seeds.landmark },
      ]
    : [];

  return (
    <section className="rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(20,184,166,0.18),rgba(59,130,246,0.12),rgba(15,23,42,0.74))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-100">
            <ScrollText className="h-4 w-4 text-cyan-100" />
            Name seeds
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-100/84">
            Quick labels for places on the fly.
          </p>
        </div>

        <button
          onClick={onReroll}
          className="rounded-2xl border border-white/12 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/14"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>
      </div>

      {seeds ? (
        <div className="mt-4 grid gap-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(15,23,42,0.38))] px-4 py-3"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-slate-100/74">
                {row.label}
              </span>
              <span className="text-sm font-medium text-white">{row.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-white/14 bg-white/6 px-4 py-6 text-sm text-slate-300">
          Generate a region to seed names.
        </div>
      )}
    </section>
  );
};
