/**
 * APP.TSX - REFACTORED FOR DEEP DATA TRANSLATION
 * Focus: Fixing CHERT lookup and integrating Mythology/Tech metadata.
 */

import React, { useState, useEffect } from "react";
import { useWorldEngine } from "./hooks/useWorldEngine";
import { useWeatherEngine } from "./hooks/useWeatherEngine";
import { useCrafting } from "./hooks/useCrafting";

// DATA IMPORT
import { WorldData } from "./data";

// HUD COMPONENTS
import { Compass } from "./components/HUD/Compass";
import { DayLog } from "./components/HUD/DayLog";
import { ResourceCard } from "./components/HUD/ResourceCard";

const App: React.FC = () => {
  const { region, generateNewRegion } = useWorldEngine();
  const { dailyStatus, rollWeather } = useWeatherEngine();
  const { getDieForLevel } = useCrafting();

  const [craftingProgress, setCraftingProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(1);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [activeInspection, setActiveInspection] = useState<{
    name: string;
    desc: string;
  } | null>(null);

  useEffect(() => {
    if (!region.climate) {
      handleFullScan();
    }
  }, []);

  const handleFullScan = () => {
    const newRegion = generateNewRegion();
    if (newRegion.climate) {
      rollWeather(newRegion.climate);
    }
    setCraftingProgress(0);
    setLastRoll(null);
    setActiveInspection(null);
  };

  /**
   * ROBUST UNIVERSAL LOOKUP
   * Now scans trees, stones, mythology, and technology glossaries.
   *
   */
  const handleInspect = (name: string) => {
    // 1. Collect all possible data sources from WorldData
    const data = WorldData as any;
    const glossaries = [
      data.TREE_GLOSSARY,
      data.STONE_GLOSSARY,
      data.MYTH_GLOSSARY, // Added for God data
      data.TECH_GLOSSARY, // Added for Technology data
    ].filter(Boolean);

    // 2. Normalize the search key (e.g., "White Pine" -> "WHITEPINE")
    const normalize = (str: string) => str.toUpperCase().replace(/[\s_-]/g, "");
    const searchKey = normalize(name);

    let description = "";

    // 3. Deep search across all active glossaries
    for (const glossary of glossaries) {
      const foundKey = Object.keys(glossary).find(
        (k) => normalize(k) === searchKey,
      );
      if (foundKey) {
        description = glossary[foundKey];
        break;
      }
    }

    setActiveInspection({
      name,
      desc:
        description ||
        `ARCHIVE_MISSING: Metadata for [${name}] not found in standard glossaries. Check export schema in WorldData.ts.`,
    });
  };

  return (
    <div className="w-full h-screen bg-[#020202] text-zinc-500 font-mono flex flex-col overflow-hidden">
      {/* HEADER STRIP */}
      <header className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-black">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.4em] text-white font-black uppercase">
            World-Glass // <span className="text-cyan-500">v4.5 Terminal</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT: RESOURCE MANIFEST */}
        <aside className="w-64 border-r border-white/5 bg-[#050505] overflow-y-auto">
          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-[10px] font-bold text-white uppercase tracking-widest">
              Local Manifest
            </h2>
          </div>
          <div className="p-4 space-y-6">
            <ResourceCard
              title="Flora"
              items={region.localTrees}
              color="text-emerald-400"
              onInspect={handleInspect}
            />
            <ResourceCard
              title="Geology"
              items={region.localStones}
              color="text-blue-400"
              onInspect={handleInspect}
            />
          </div>
        </aside>

        {/* CENTER: VIEWPORT */}
        <section className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_50%_30%,#0a0a0a_0%,#020202_100%)]">
          <div className="p-12 flex-1">
            <span className="text-[10px] text-cyan-500/50 uppercase tracking-[0.5em] mb-4 block">
              Atmospheric Severity
            </span>
            <h2 className="text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
              {dailyStatus.severity} <br />
              <span className="text-cyan-500">{dailyStatus.weatherEffect}</span>
            </h2>

            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              <DayLog
                weather={dailyStatus.weatherEffect}
                severity={dailyStatus.severity}
                temp={dailyStatus.tempName}
                effect={dailyStatus.tempEffect}
              />

              {/* INSPECTION TERMINAL - Now translates God/Tech data as well */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <h3 className="text-[10px] text-white font-bold uppercase mb-4 opacity-50">
                  Translation Output
                </h3>
                {activeInspection ? (
                  <div className="animate-in fade-in slide-in-from-left duration-500">
                    <h4 className="text-2xl font-black text-white italic mb-2 uppercase">
                      {activeInspection.name}
                    </h4>
                    <p className="text-zinc-400 text-lg leading-relaxed italic border-l-2 border-cyan-500 pl-4">
                      {activeInspection.desc}
                    </p>
                  </div>
                ) : (
                  <p className="text-zinc-700 text-xs italic">
                    Awaiting selection from manifest or navigation data...
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: NAVIGATION & METADATA */}
        <aside className="w-80 border-l border-white/5 bg-[#050505] p-6 flex flex-col gap-8">
          <div className="space-y-6">
            <header className="flex justify-between items-end border-b border-white/10 pb-2">
              <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">
                Navigation
              </h3>
              <span className="text-[10px] text-zinc-500">{region.planet}</span>
            </header>

            {/* INTEGRATED GODS & TECH DATA */}
            <div className="space-y-4">
              <button
                onClick={() => handleInspect(region.mythology)}
                className="w-full text-left group hover:bg-white/[0.02] p-2 transition-all"
              >
                <div className="flex justify-between text-[8px] uppercase text-zinc-600 font-bold mb-1">
                  <span>Sovereign Mythos</span>
                  <span className="text-cyan-500 group-hover:animate-pulse">
                    Inspect
                  </span>
                </div>
                <div className="text-xl font-black text-white uppercase italic leading-tight group-hover:text-cyan-400">
                  {region.mythology || "No Data"}
                </div>
              </button>

              <button
                onClick={() => handleInspect(region.tech)}
                className="w-full text-left group hover:bg-white/[0.02] p-2 transition-all"
              >
                <div className="flex justify-between text-[8px] uppercase text-zinc-600 font-bold mb-1">
                  <span>Tech Advancement</span>
                  <span className="text-cyan-500 group-hover:animate-pulse">
                    Inspect
                  </span>
                </div>
                <div className="text-xl font-black text-white uppercase italic leading-tight group-hover:text-cyan-400">
                  {region.tech || "No Data"}
                </div>
              </button>
            </div>

            <Compass planet={region.planet} mythology={region.mythology} />
          </div>

          {/* EXTRACTION SYSTEM */}
          <div className="mt-auto bg-orange-600 p-6 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 animate-scan" />
            <h3 className="text-[10px] font-black text-black uppercase tracking-widest mb-4">
              Acquisition Score
            </h3>
            <div className="text-6xl font-black text-white tracking-tighter tabular-nums leading-none">
              {craftingProgress}
            </div>
            <button
              onClick={() => {
                const roll = Math.floor(Math.random() * 20) + 1; // Simplified for demo
                setLastRoll(roll);
                setCraftingProgress((p) => p + roll);
              }}
              className="w-full mt-6 py-4 bg-black text-white font-black uppercase text-[10px] tracking-widest border border-white/20 hover:bg-zinc-900 transition-all"
            >
              Execute Extraction
            </button>
          </div>
        </aside>
      </main>

      {/* FOOTER PULSE */}
      <footer className="h-8 border-t border-white/5 flex items-center px-6 justify-between bg-black">
        <button
          onClick={handleFullScan}
          className="text-[8px] font-bold text-zinc-600 hover:text-white uppercase tracking-[0.3em]"
        >
          Re-Initialize environment sequence
        </button>
        <span className="text-[8px] text-zinc-800 uppercase">
          System Time: 2026.04.24
        </span>
      </footer>
    </div>
  );
};

export default App;
