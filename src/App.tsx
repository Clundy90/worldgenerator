import React, { useEffect, useState } from "react";
import {
  BookOpenText,
  FlaskConical,
  Gem,
  Leaf,
  Map,
  Mountain,
  RefreshCcw,
  Sparkles,
  Users,
} from "lucide-react";
import { useWorldEngine } from "./hooks/useWorldEngine";
import { useWeatherEngine } from "./hooks/useWeatherEngine";
import { useCrafting } from "./hooks/useCrafting";
import { getClimateTheme } from "./data/climateThemes";
import {
  getClimateDescription,
  getInspectionRecord,
  type InspectionRecord,
} from "./data/catalog";
import {
  generateLocation,
  type GeneratedLocation,
  type RegionContext,
} from "./data/locationGenerator";
import {
  generateFrontierThreads,
  type FrontierThreads,
} from "./data/frontierThreads";
import { DayLog } from "./components/HUD/DayLog";
import { DiceTray } from "./components/HUD/DiceTray";
import { FrontierThreadsCard } from "./components/HUD/FrontierThreadsCard";
import { LocationCard } from "./components/HUD/LocationCard";
import { NameSeedsCard } from "./components/HUD/NameSeedsCard";
import { ResourceCard } from "./components/HUD/ResourceCard";
import { generateNameSeeds, type NameSeeds } from "./data/nameSeeds";

type ActiveInspection = InspectionRecord & {
  craftables: string[];
};

const App: React.FC = () => {
  const { region, generateNewRegion } = useWorldEngine();
  const { dailyStatus, rollWeather } = useWeatherEngine();
  const { getDieForLevel, getItemsForMaterial, rules } = useCrafting();

  const [craftingProgress, setCraftingProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(1);
  const [supportCrew, setSupportCrew] = useState(0);
  const [useFacilities, setUseFacilities] = useState(true);
  const [lastSession, setLastSession] = useState<{
    roll: number;
    support: number;
    total: number;
  } | null>(null);
  const [activeInspection, setActiveInspection] = useState<ActiveInspection | null>(
    null,
  );
  const [activeLocation, setActiveLocation] = useState<GeneratedLocation | null>(
    null,
  );
  const [frontierThreads, setFrontierThreads] = useState<FrontierThreads | null>(
    null,
  );
  const [nameSeeds, setNameSeeds] = useState<NameSeeds | null>(null);

  const handleInspect = (name: string) => {
    const record = getInspectionRecord(name);
    const craftables = getItemsForMaterial(name) ?? [];

    setActiveInspection({
      ...record,
      craftables,
    });
  };

  const buildLocationAndThreads = (
    sourceRegion: RegionContext,
    weatherEffect: string,
  ) => {
    const nextLocation = generateLocation(sourceRegion);
    setActiveLocation(nextLocation);
    setNameSeeds(generateNameSeeds(sourceRegion, nextLocation));
    setFrontierThreads(
      generateFrontierThreads(sourceRegion, nextLocation, weatherEffect),
    );
  };

  const handleGenerateLocation = (
    sourceRegion: RegionContext = region,
    weatherEffect = dailyStatus.weatherEffect || "Unusual weather",
  ) => {
    if (!sourceRegion.climate) {
      return;
    }

    buildLocationAndThreads(sourceRegion, weatherEffect);
  };

  const handleGenerateThreads = (
    sourceRegion: RegionContext = region,
    sourceLocation = activeLocation,
    weatherEffect = dailyStatus.weatherEffect || "Unusual weather",
  ) => {
    if (!sourceRegion.climate) {
      return;
    }

    setFrontierThreads(
      generateFrontierThreads(sourceRegion, sourceLocation, weatherEffect),
    );
  };

  const handleGenerateNames = (
    sourceRegion: RegionContext = region,
    sourceLocation = activeLocation,
  ) => {
    if (!sourceRegion.climate) {
      return;
    }

    setNameSeeds(generateNameSeeds(sourceRegion, sourceLocation));
  };

  const handleFullScan = () => {
    const newRegion = generateNewRegion();

    if (newRegion.climate) {
      const weatherStatus = rollWeather(newRegion.climate);
      handleInspect(newRegion.climate);
      buildLocationAndThreads(newRegion, weatherStatus.weatherEffect);
    }

    setCraftingProgress(0);
    setLastSession(null);
  };

  useEffect(() => {
    if (!region.climate) {
      handleFullScan();
    }
    // The app performs a single startup scan to seed the dashboard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assistantCap = Math.floor((masteryLevel - 1) / 4) + 2;
  const normalizedSupportCrew = Math.min(supportCrew, assistantCap);
  const supportBonus = normalizedSupportCrew + (useFacilities ? 2 : 0);

  useEffect(() => {
    if (supportCrew > assistantCap) {
      setSupportCrew(assistantCap);
    }
  }, [assistantCap, supportCrew]);

  const handleCraftingSession = () => {
    const die = getDieForLevel(masteryLevel);
    const sides = Number(die.replace("d", "")) || 4;
    const roll = Math.floor(Math.random() * sides) + 1;
    const total = roll + supportBonus;

    setLastSession({
      roll,
      support: supportBonus,
      total,
    });
    setCraftingProgress((current) => current + total);
  };

  const worldFacts = [
    {
      label: "Mythology",
      value: region.mythology,
      icon: <BookOpenText className="h-4 w-4 text-amber-200" />,
    },
    {
      label: "Technology",
      value: region.tech,
      icon: <Gem className="h-4 w-4 text-sky-200" />,
    },
    {
      label: "Magic",
      value: region.magic,
      icon: <Sparkles className="h-4 w-4 text-emerald-200" />,
    },
    {
      label: "Drainage",
      value: region.drainage,
      icon: <Mountain className="h-4 w-4 text-rose-200" />,
    },
    {
      label: "Life",
      value: region.life,
      icon: <Leaf className="h-4 w-4 text-lime-200" />,
    },
  ];

  const climateDescription = getClimateDescription(region.climate);
  const climateTheme = getClimateTheme(region.climate, dailyStatus.weatherEffect);
  const localInputs = [
    ...region.localTrees.slice(0, 3),
    ...region.localStones.slice(0, 3),
  ];
  const craftingFocus = activeInspection?.craftables.length
    ? activeInspection.craftables
    : [];

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 ${climateTheme.ambientBase}`} />
        <div className={`absolute inset-0 opacity-95 ${climateTheme.ambientTexture}`} />
        <div className={`absolute inset-0 opacity-80 ${climateTheme.weatherMotion}`} />
        <div className={`absolute inset-0 opacity-70 ${climateTheme.colorBursts}`} />
        <div className={`absolute inset-x-0 bottom-0 h-[45vh] ${climateTheme.horizon}`} />
        <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_72%)]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <header
          className={`rounded-[30px] border bg-slate-950/50 px-5 py-4 backdrop-blur-xl ${climateTheme.headerGlow}`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-sky-100/90">
                World Generator
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
                <h1 className="font-[var(--font-display)] text-4xl leading-none text-white sm:text-5xl">
                  Survey the next frontier
                </h1>
                <span className="rounded-full border border-white/12 bg-white/12 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-100">
                  Interactive world tables
                </span>
              </div>
            </div>

            <button
              onClick={handleFullScan}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/14 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/18"
            >
              <RefreshCcw className="h-4 w-4" />
              Generate new region
            </button>
          </div>
        </header>

        <main className="mt-6 grid flex-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
          <section className="space-y-6">
            <div className="rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(15,23,42,0.72),rgba(59,130,246,0.12),rgba(15,23,42,0.76))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-200">
                <Map className="h-4 w-4 text-sky-100" />
                Region overview
              </div>

              <div
                className={`mt-5 rounded-[26px] border border-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${climateTheme.previewTone}`}
              >
                <p className="text-sm uppercase tracking-[0.28em] text-sky-50/85">
                  Planet form
                </p>
                <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-tight text-white">
                  {region.planet || "Awaiting scan"}
                </h2>
                <button
                  onClick={() => handleInspect(region.climate)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/18 px-4 py-2 text-sm text-white transition hover:bg-black/26"
                >
                  <Sparkles className="h-4 w-4 text-amber-200" />
                  {region.climate || "Climate pending"}
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {worldFacts.map((fact) => (
                  <button
                    key={fact.label}
                    onClick={() => handleInspect(fact.value)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(15,23,42,0.34))] px-4 py-3 text-left transition hover:border-white/20 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(15,23,42,0.42))]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="rounded-xl border border-white/12 bg-black/18 p-2">
                        {fact.icon}
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.24em] text-slate-300">
                          {fact.label}
                        </span>
                        <span className="mt-1 block text-sm text-white">
                          {fact.value || "No data"}
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <LocationCard
              location={activeLocation}
              onGenerate={() => handleGenerateLocation()}
            />
          </section>

          <section className="space-y-6">
            <section
              className={`rounded-[32px] border border-white/12 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl ${climateTheme.climatePanel}`}
            >
              <p className={`text-xs uppercase tracking-[0.32em] ${climateTheme.accentText}`}>
                Climate brief
              </p>
              <div className="mt-4">
                <h2 className="font-[var(--font-display)] text-5xl leading-none text-white sm:text-6xl">
                  {region.climate || "Unknown"}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-50/95">
                  {climateDescription ||
                    "Generate a region to reveal the environmental profile."}
                </p>
              </div>
            </section>

            <DayLog
              weather={dailyStatus.weatherEffect}
              severity={dailyStatus.severity}
              temp={dailyStatus.tempName}
              effect={dailyStatus.tempEffect}
            />

            <section className="rounded-[32px] border border-white/12 bg-[linear-gradient(160deg,rgba(37,99,235,0.12),rgba(15,23,42,0.7),rgba(14,165,233,0.12))] p-6 shadow-[0_22px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-200">
                <Sparkles className="h-4 w-4 text-sky-100" />
                Inspection archive
              </div>

              {activeInspection ? (
                <div className="mt-5 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-sky-100/20 bg-sky-300/18 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-50">
                      {activeInspection.category}
                    </span>
                    <h3 className="font-[var(--font-display)] text-4xl leading-none text-white">
                      {activeInspection.name}
                    </h3>
                  </div>

                  <p className="max-w-3xl text-base leading-8 text-slate-100">
                    {activeInspection.description}
                  </p>

                  {activeInspection.context.length ? (
                    <div className="flex flex-wrap gap-2">
                      {activeInspection.context.map((detail) => (
                        <span
                          key={detail}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {activeInspection.craftables.length ? (
                    <div className="rounded-[24px] border border-emerald-200/14 bg-[linear-gradient(145deg,rgba(16,185,129,0.2),rgba(21,128,61,0.14),rgba(15,23,42,0.4))] p-5">
                      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-emerald-50">
                        <Gem className="h-4 w-4" />
                        Crafting potential
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeInspection.craftables.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-emerald-100/12 bg-black/18 px-3 py-1 text-sm text-emerald-50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-5 rounded-[28px] border border-dashed border-white/14 bg-white/6 px-6 py-10 text-center text-slate-300">
                  Select any climate, world trait, tree, or stone to inspect its lore and context here.
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(251,191,36,0.16),rgba(120,53,15,0.12),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-100">
                <FlaskConical className="h-4 w-4 text-amber-100" />
                Crafting table
              </div>

              <div className="mt-5 flex items-end justify-between gap-4 rounded-[24px] border border-amber-100/14 bg-[linear-gradient(145deg,rgba(251,191,36,0.2),rgba(234,88,12,0.18),rgba(15,23,42,0.28))] p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-50/85">
                    Progress points
                  </p>
                  <p className="mt-2 text-5xl font-semibold text-white">
                    {craftingProgress}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200/80">
                    Last session
                  </p>
                  <p className="mt-2 text-2xl text-white">
                    {lastSession ? `+${lastSession.total}` : "--"}
                  </p>
                  <p className="mt-1 text-xs text-slate-200/70">
                    {lastSession
                      ? `${lastSession.roll} roll + ${lastSession.support} support`
                      : "No session recorded"}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">
                    Base session
                  </p>
                  <p className="mt-2 text-sm text-white">{rules.default_rate}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-200/70">
                    {rules.material_cost}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">
                    Active die
                  </p>
                  <p className="mt-2 text-sm text-white">
                    Level {masteryLevel} uses {getDieForLevel(masteryLevel)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-200/70">
                    Workshop support currently adds {supportBonus} points to each
                    session.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                <p className="text-sm text-slate-50">Mastery level</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMasteryLevel((level) => Math.max(1, level - 1))}
                    className="h-9 w-9 rounded-xl border border-white/12 bg-black/18 text-lg text-white transition hover:bg-black/28"
                  >
                    -
                  </button>
                  <div className="min-w-28 rounded-xl border border-white/12 bg-black/18 px-3 py-2 text-center">
                    <p className="text-sm font-medium text-white">Level {masteryLevel}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">
                      Roll {getDieForLevel(masteryLevel)}
                    </p>
                  </div>
                  <button
                    onClick={() => setMasteryLevel((level) => Math.min(20, level + 1))}
                    className="h-9 w-9 rounded-xl border border-white/12 bg-black/18 text-lg text-white transition hover:bg-black/28"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white">Workshop facilities</p>
                    <p className="mt-1 text-xs leading-5 text-slate-200/70">
                      {rules.changes.locations}
                    </p>
                  </div>
                  <button
                    onClick={() => setUseFacilities((current) => !current)}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                      useFacilities
                        ? "border-emerald-100/20 bg-emerald-300/18 text-emerald-50"
                        : "border-white/10 bg-black/18 text-slate-100"
                    }`}
                  >
                    {useFacilities ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Users className="h-4 w-4 text-sky-100" />
                    Assistants
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSupportCrew((count) => Math.max(0, count - 1))
                      }
                      className="h-9 w-9 rounded-xl border border-white/12 bg-black/18 text-lg text-white transition hover:bg-black/28"
                    >
                      -
                    </button>
                    <div className="min-w-24 rounded-xl border border-white/12 bg-black/18 px-3 py-2 text-center">
                      <p className="text-sm font-medium text-white">
                        {normalizedSupportCrew}/{assistantCap}
                      </p>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">
                        crew
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setSupportCrew((count) => Math.min(assistantCap, count + 1))
                      }
                      className="h-9 w-9 rounded-xl border border-white/12 bg-black/18 text-lg text-white transition hover:bg-black/28"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-200/70">
                  Assistant capacity scales with level to echo the lead artisan rule.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-100/12 bg-[linear-gradient(145deg,rgba(16,185,129,0.18),rgba(15,23,42,0.22))] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-50/85">
                  Current project focus
                </p>
                <p className="mt-2 text-sm text-white">
                  {activeInspection
                    ? activeInspection.name
                    : "Select a material, place, or world trait to anchor the next session."}
                </p>
                {craftingFocus.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {craftingFocus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-emerald-100/12 bg-black/18 px-3 py-1 text-xs text-emerald-50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-200/75">
                  Nearby materials
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {localInputs.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/18 px-3 py-1 text-xs text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCraftingSession}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/14 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/18"
              >
                <FlaskConical className="h-4 w-4" />
                Advance crafting session
              </button>
            </section>
          </section>

          <section className="space-y-6">
            <ResourceCard
              title="Flora"
              items={region.localTrees}
              color="text-emerald-100"
              onInspect={handleInspect}
            />
            <ResourceCard
              title="Geology"
              items={region.localStones}
              color="text-sky-100"
              onInspect={handleInspect}
            />

            <FrontierThreadsCard
              threads={frontierThreads}
              onReroll={() => handleGenerateThreads()}
            />

            <NameSeedsCard seeds={nameSeeds} onReroll={() => handleGenerateNames()} />

            <DiceTray />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
