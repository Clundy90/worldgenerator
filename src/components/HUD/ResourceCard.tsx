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
  const panelTone =
    title === "Flora"
      ? "bg-[linear-gradient(160deg,rgba(16,185,129,0.16),rgba(21,128,61,0.1),rgba(15,23,42,0.72))]"
      : "bg-[linear-gradient(160deg,rgba(56,189,248,0.16),rgba(37,99,235,0.1),rgba(15,23,42,0.72))]";

  return (
    <section className={`rounded-[24px] border border-white/12 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl ${panelTone}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${color}`}>
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-100/85">
            {items.length} recorded local results
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onInspect?.(item)}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(15,23,42,0.38))] px-4 py-3 text-left transition hover:border-white/18 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(15,23,42,0.46))]"
          >
            <span className="text-sm font-medium text-white">{item}</span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-white" />
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/12 px-4 py-5 text-sm text-slate-200/75">
          No entries are currently available in this table.
        </p>
      ) : null}
    </section>
  );
};
