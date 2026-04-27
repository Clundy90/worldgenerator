import React from "react";
import { ChevronRight } from "lucide-react";

interface ResourceCardProps {
  title: string;
  items: string[] | undefined;
  color: string;
  onInspect?: (item: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  items = [],
  color,
  onInspect,
}) => {
  return (
    <section className="rounded-[24px] border border-white/12 bg-white/6 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${color}`}>
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-300">
            {items.length} recorded local results
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onInspect?.(item)}
            className="group flex items-center justify-between rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3 text-left transition hover:border-white/18 hover:bg-slate-950/55"
          >
            <span className="text-sm font-medium text-slate-100">{item}</span>
            <ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-slate-200" />
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/12 px-4 py-5 text-sm text-slate-400">
          No entries are currently available in this table.
        </p>
      ) : null}
    </section>
  );
};
