import React from "react";
import { MapPinned, RefreshCcw } from "lucide-react";
import type { GeneratedLocation } from "../../data/locationGenerator";

interface LocationCardProps {
  location: GeneratedLocation | null;
  onGenerate: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onGenerate,
}) => {
  return (
    <section className="rounded-[28px] border border-white/12 bg-slate-950/45 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-300">
            <MapPinned className="h-4 w-4 text-rose-200" />
            Scene generator
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A roleplay-ready location grounded in the current region.
          </p>
        </div>

        <button
          onClick={onGenerate}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10"
        >
          <RefreshCcw className="h-4 w-4" />
          Reroll
        </button>
      </div>

      {location ? (
        <div className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-rose-200/14 bg-[linear-gradient(145deg,rgba(251,113,133,0.14),rgba(15,23,42,0.2))] p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.24em] text-rose-50">
                {location.category}
              </span>
              <h3 className="font-[var(--font-display)] text-3xl leading-none text-white">
                {location.name}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              {location.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {location.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {location.hooks.map((hook) => (
              <div
                key={hook}
                className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm leading-6 text-slate-200"
              >
                {hook}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-[24px] border border-dashed border-white/14 bg-white/4 px-5 py-8 text-sm text-slate-400">
          Generate a region to build a location prompt.
        </div>
      )}
    </section>
  );
};
