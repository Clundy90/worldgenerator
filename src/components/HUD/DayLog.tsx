import React from "react";
import { CloudSun, Thermometer, TriangleAlert } from "lucide-react";

interface DayLogProps {
  weather: string;
  severity: string;
  temp: string;
  effect: string;
}

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

  const items = [
    {
      label: "Weather",
      value: weather,
      icon: <CloudSun className="h-4 w-4 text-amber-200" />,
    },
    {
      label: "Severity",
      value: severity,
      icon: <TriangleAlert className="h-4 w-4 text-rose-200" />,
    },
    {
      label: "Temperature",
      value: temp,
      icon: <Thermometer className="h-4 w-4 text-cyan-200" />,
    },
  ];

  return (
    <section className="rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(14,165,233,0.14),rgba(251,191,36,0.12),rgba(15,23,42,0.72))] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">
            Daily Conditions
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Current field report
          </h3>
        </div>
        <p className="text-sm text-slate-200/75">{timestamp}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(15,23,42,0.36))] p-4"
          >
            <div className="flex items-center gap-2 text-sm text-slate-100/85">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <p className="mt-3 text-lg font-medium text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-amber-100/14 bg-[linear-gradient(145deg,rgba(251,191,36,0.16),rgba(15,23,42,0.28))] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-amber-50/85">
          Field effect
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-100">{effect}</p>
      </div>
    </section>
  );
};
