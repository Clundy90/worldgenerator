import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, RefreshCcw } from "lucide-react";
import type { FrontierThreads } from "../../data/frontierThreads";

interface FrontierThreadsCardProps {
  threads: FrontierThreads | null;
  onReroll: () => void;
}

export const FrontierThreadsCard: React.FC<FrontierThreadsCardProps> = ({
  threads,
  onReroll,
}) => {
  return (
    <section className="rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(37,99,235,0.18),rgba(168,85,247,0.14),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-100">
            <Compass className="h-4 w-4 text-fuchsia-200" />
            Frontier threads
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-200/90">
            Fast story pressure for the current region.
          </p>
        </div>

        <button
          onClick={onReroll}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/14"
        >
          <RefreshCcw className="h-4 w-4" />
          Reroll
        </button>
      </div>

      {threads ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={threads.focus + threads.threads.map((item) => item.title).join("-")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mt-5 space-y-3"
          >
            <div className="rounded-[24px] border border-white/12 bg-[linear-gradient(135deg,rgba(236,72,153,0.18),rgba(59,130,246,0.16),rgba(255,255,255,0.05))] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-100/85">
                Current focus
              </p>
              <h3 className="mt-2 font-[var(--font-display)] text-2xl leading-none text-white">
                {threads.focus}
              </h3>
            </div>

            <div className="grid gap-3">
              {threads.threads.map((thread) => (
                <div
                  key={thread.label + thread.title}
                  className="rounded-[22px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.12),rgba(15,23,42,0.4))] p-3.5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/14 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-100">
                      {thread.label}
                    </span>
                    <h4 className="text-base font-semibold text-white">{thread.title}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-100/90">
                    {thread.summary}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="mt-5 rounded-[24px] border border-dashed border-white/14 bg-white/6 px-5 py-8 text-sm text-slate-300">
          Generate a region to build active story pressure for the right rail.
        </div>
      )}
    </section>
  );
};
