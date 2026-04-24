import React from "react";

interface ResourceCardProps {
  title: string;
  items: string[] | undefined;
  color: string;
  onInspect?: (item: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  items,
  color,
  onInspect,
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl">
      <h3
        className={`text-[10px] font-black uppercase tracking-widest mb-4 ${color}`}
      >
        {title} Analysis
      </h3>
      <div className="space-y-1">
        {items?.map((item) => (
          <button
            key={item}
            onClick={() => onInspect?.(item)}
            className="w-full text-left text-xs text-zinc-400 hover:text-white py-1 border-b border-white/5 transition-colors uppercase"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
