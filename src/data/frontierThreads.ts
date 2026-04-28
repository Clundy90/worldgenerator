import type { GeneratedLocation, RegionContext } from "./locationGenerator";

export type FrontierThread = {
  label: string;
  title: string;
  summary: string;
  stakes: string;
};

export type FrontierThreads = {
  focus: string;
  threads: FrontierThread[];
};

const sample = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const toLower = (value: string) => value.toLowerCase();

const conflictTitles = [
  "Border tension",
  "Broken obligation",
  "Missing patrol",
  "Dangerous misunderstanding",
  "Supply dispute",
];

const opportunityTitles = [
  "Quiet opening",
  "Profitable errand",
  "Unexpected ally",
  "Forgotten route",
  "Useful rumor",
];

const secretTitles = [
  "Buried truth",
  "False story",
  "Hidden claimant",
  "Private heresy",
  "Disguised threat",
];

const conflictSummaries = (region: RegionContext, location: GeneratedLocation | null) => [
  `Tension is building around ${location?.name ?? "the current route"} as ${toLower(region.tech)} rules collide with local custom.`,
  `A fight over access to ${toLower(region.drainage)} ground is turning neighbors into enemies.`,
  `The ${toLower(region.climate)} conditions are sharpening an old feud that nobody wants to lose face over.`,
];

const opportunitySummaries = (
  region: RegionContext,
  location: GeneratedLocation | null,
) => [
  `Someone near ${location?.name ?? "this region"} will pay well for discreet help.`,
  `Knowledge of ${region.localTrees[0] ?? "the nearby wilds"} and ${region.localStones[0] ?? "the terrain"} gives the party an edge outsiders lack.`,
  `A task tied to the region's ${toLower(region.mythology)} could earn trust before rivals notice it.`,
];

const secretSummaries = (region: RegionContext, location: GeneratedLocation | null) => [
  `${location?.name ?? "This area"} is sitting on a truth that would embarrass someone powerful.`,
  `The local story about this place is missing the most dangerous part in a ${toLower(region.magic)} world.`,
  `A respectable figure is hiding motives tied to the region's ${toLower(region.tech)} ambitions.`,
];

const stakeLines = (region: RegionContext, weather: string) => [
  `If ignored, the current ${toLower(weather)} weather will make the next bad choice harder to fix.`,
  `Failure here could shift who controls access to the region's scarce security, trade, or shelter.`,
  `The stakes feel local now, but they touch travel, reputation, and survival across this ${toLower(region.climate)} stretch.`,
];

export const generateFrontierThreads = (
  region: RegionContext,
  location: GeneratedLocation | null,
  weather: string,
): FrontierThreads => {
  return {
    focus: location?.name ?? "Regional pressure",
    threads: [
      {
        label: "Conflict",
        title: sample(conflictTitles),
        summary: sample(conflictSummaries(region, location)),
        stakes: sample(stakeLines(region, weather)),
      },
      {
        label: "Opportunity",
        title: sample(opportunityTitles),
        summary: sample(opportunitySummaries(region, location)),
        stakes: sample(stakeLines(region, weather)),
      },
      {
        label: "Secret",
        title: sample(secretTitles),
        summary: sample(secretSummaries(region, location)),
        stakes: sample(stakeLines(region, weather)),
      },
    ],
  };
};
