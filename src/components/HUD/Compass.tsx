import React from "react";
import { Compass as CompassIcon } from "lucide-react";

interface CompassProps {
  planet: string;
  mythology: string;
}

export const Compass: React.FC<CompassProps> = ({ planet, mythology }) => {
  return (
    <section className="rounded-[28px] border border-white/12 bg-slate-950/40 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            World Frame
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{planet}</h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sky-200">
          <CompassIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_148px]">
        <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Dominant mythic axis
          </p>
          <p className="mt-2 text-base leading-7 text-slate-100">{mythology}</p>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-[148px] items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),rgba(15,23,42,0)_58%)]">
          <div className="absolute inset-3 rounded-full border border-dashed border-sky-200/20" />
          <div className="absolute inset-7 rounded-full border border-white/10" />
          <div className="absolute top-3 text-[10px] uppercase tracking-[0.28em] text-slate-400">
            N
          </div>
          <div className="absolute bottom-3 text-[10px] uppercase tracking-[0.28em] text-slate-400">
            S
          </div>
          <div className="absolute left-3 text-[10px] uppercase tracking-[0.28em] text-slate-400">
            W
          </div>
          <div className="absolute right-3 text-[10px] uppercase tracking-[0.28em] text-slate-400">
            E
          </div>
          <div className="h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_24px_rgba(125,211,252,0.8)]" />
        </div>
      </div>
    </section>
  );
};
