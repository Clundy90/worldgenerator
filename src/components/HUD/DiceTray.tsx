import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dices, Sparkles } from "lucide-react";

type DieSpec = {
  label: string;
  sides: number;
  clipPath: string;
  tone: string;
};

type RollState = {
  label: string;
  results: number[];
  total: number;
  key: number;
  clipPath: string;
  tone: string;
};

const diceSet: DieSpec[] = [
  {
    label: "d4",
    sides: 4,
    clipPath: "polygon(50% 6%, 8% 92%, 92% 92%)",
    tone: "from-rose-400/75 to-orange-500/70",
  },
  {
    label: "d6",
    sides: 6,
    clipPath: "polygon(12% 12%, 88% 12%, 88% 88%, 12% 88%)",
    tone: "from-amber-300/75 to-yellow-500/70",
  },
  {
    label: "d8",
    sides: 8,
    clipPath: "polygon(50% 4%, 94% 50%, 50% 96%, 6% 50%)",
    tone: "from-emerald-300/75 to-teal-500/70",
  },
  {
    label: "d10",
    sides: 10,
    clipPath: "polygon(50% 4%, 92% 30%, 82% 92%, 18% 92%, 8% 30%)",
    tone: "from-cyan-300/75 to-sky-500/70",
  },
  {
    label: "d12",
    sides: 12,
    clipPath:
      "polygon(26% 4%, 74% 4%, 96% 34%, 88% 78%, 50% 96%, 12% 78%, 4% 34%)",
    tone: "from-indigo-300/75 to-blue-600/70",
  },
  {
    label: "d20",
    sides: 20,
    clipPath:
      "polygon(50% 2%, 80% 12%, 98% 38%, 92% 72%, 68% 96%, 32% 96%, 8% 72%, 2% 38%, 20% 12%)",
    tone: "from-fuchsia-300/75 to-violet-600/70",
  },
  {
    label: "d100",
    sides: 100,
    clipPath: "polygon(50% 2%, 82% 12%, 98% 44%, 90% 80%, 58% 98%, 22% 88%, 4% 56%, 14% 20%)",
    tone: "from-slate-200/75 to-slate-500/75",
  },
];

const rollDie = (sides: number) => Math.floor(Math.random() * sides) + 1;

const DieFace: React.FC<{
  die: Pick<DieSpec, "clipPath" | "label" | "tone">;
  value?: string;
  large?: boolean;
}> = ({ die, value, large = false }) => (
  <div
    className={`relative flex items-center justify-center text-white shadow-[0_14px_28px_rgba(15,23,42,0.34)] ${
      large ? "h-20 w-20 text-2xl" : "h-14 w-14 text-sm"
    }`}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${die.tone} ring-1 ring-white/20`}
      style={{ clipPath: die.clipPath }}
    />
    <div className="absolute inset-[8%] opacity-45" style={{ clipPath: die.clipPath }}>
      <div className="h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.26),transparent_45%,rgba(15,23,42,0.2)_100%)]" />
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center">
      <span className={`${large ? "text-[10px]" : "text-[9px]"} uppercase tracking-[0.22em] text-white/80`}>
        {die.label}
      </span>
      {value ? <span className="font-semibold">{value}</span> : null}
    </div>
  </div>
);

export const DiceTray: React.FC = () => {
  const [rollState, setRollState] = useState<RollState | null>(null);

  const handleRoll = (die: DieSpec) => {
    const result = rollDie(die.sides);
    setRollState({
      label: die.label,
      results: [result],
      total: result,
      key: Date.now(),
      clipPath: die.clipPath,
      tone: die.tone,
    });
  };

  const handleRollAll = () => {
    const results = diceSet.map((die) => rollDie(die.sides));
    const total = results.reduce((sum, value) => sum + value, 0);

    setRollState({
      label: "Full set",
      results,
      total,
      key: Date.now(),
      clipPath:
        "polygon(50% 2%, 82% 12%, 98% 44%, 90% 80%, 58% 98%, 22% 88%, 4% 56%, 14% 20%)",
      tone: "from-amber-300/75 via-fuchsia-400/70 to-sky-500/70",
    });
  };

  return (
    <section className="rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(234,88,12,0.2),rgba(217,70,239,0.14),rgba(15,23,42,0.74))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-100">
            <Dices className="h-4 w-4 text-amber-100" />
            Dice tray
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-100/85">
            Full DnD dice set with animated rolls.
          </p>
        </div>

        <button
          onClick={handleRollAll}
          className="rounded-2xl border border-white/12 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/14"
        >
          Roll all
        </button>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {diceSet.map((die) => (
          <motion.button
            key={die.label}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.95, rotate: -8 }}
            onClick={() => handleRoll(die)}
            className="flex items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(15,23,42,0.36))] py-2 transition hover:border-white/18"
          >
            <DieFace die={die} />
          </motion.button>
        ))}
      </div>

      <div className="mt-4 rounded-[24px] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(15,23,42,0.36))] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">
              Latest roll
            </p>
            <p className="mt-2 text-sm text-white">
              {rollState ? rollState.label : "Waiting for a roll"}
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={rollState?.key ?? "empty"}
              initial={{ scale: 0.5, rotate: -120, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 120, opacity: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            >
              {rollState ? (
                <DieFace
                  die={{
                    clipPath: rollState.clipPath,
                    label: rollState.label === "Full set" ? "all" : rollState.label,
                    tone: rollState.tone,
                  }}
                  value={String(rollState.total)}
                  large
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/12 bg-black/18 text-2xl font-semibold text-white">
                  --
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {rollState ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {rollState.results.map((result, index) => (
              <span
                key={`${rollState.key}-${index}`}
                className="rounded-full border border-white/10 bg-black/18 px-3 py-1 text-xs text-slate-100"
              >
                {rollState.label === "Full set"
                  ? `${diceSet[index].label}: ${result}`
                  : `${rollState.label}: ${result}`}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-200/70">
            <Sparkles className="h-3.5 w-3.5" />
            The result die spins into place with its proper shape.
          </div>
        )}
      </div>
    </section>
  );
};
