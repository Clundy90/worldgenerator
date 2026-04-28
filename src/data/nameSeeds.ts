import type { GeneratedLocation, RegionContext } from "./locationGenerator";

export type NameSeeds = {
  settlement: string;
  tavern: string;
  landmark: string;
};

/**
 * Picks a random element from an array.
 * Updated to accept 'readonly' arrays to satisfy the 'as const' climateWords.
 */
const sample = <T>(items: T[] | readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const climateWords = {
  Arid: ["Sun", "Dust", "Amber", "Saffron", "Cinder"],
  Tropical: ["Jade", "Palm", "Verdant", "Mango", "Canopy"],
  Subtropical: ["Storm", "Bay", "Silver", "Monsoon", "Harbor"],
  Temperate: ["Green", "Oak", "River", "Crown", "Moss"],
  Polar: ["Frost", "White", "Winter", "Ice", "Star"],
  Aquatic: ["Tide", "Coral", "Brine", "Azure", "Foam"],
} as const;

const settlementSuffixes = [
  "Hollow",
  "Crossing",
  "Watch",
  "Reach",
  "Ford",
  "Gate",
  "Rest",
  "Point",
];

const tavernStarts = [
  "The Golden",
  "The Crooked",
  "The Sleeping",
  "The Broken",
  "The Wandering",
  "The Velvet",
];

const tavernEnds = [
  "Lantern",
  "Stag",
  "Anvil",
  "Osprey",
  "Spear",
  "Whale",
  "Boar",
  "Fox",
];

const landmarkEnds = [
  "Spire",
  "Run",
  "Shelf",
  "Cairn",
  "Mouth",
  "Hearth",
  "Pass",
  "Rise",
];

/**
 * Generates seed names based on regional ecology and climate.
 * Falls back to Temperate words if the climate key is missing.
 */
export const generateNameSeeds = (
  region: RegionContext,
  location: GeneratedLocation | null,
): NameSeeds => {
  const wordSet =
    climateWords[region.climate as keyof typeof climateWords] ??
    climateWords.Temperate;

  // These variables pull from the region's specific ecology or the climate fallback
  const localTree = region.localTrees[0] ?? sample(wordSet);
  const localStone = region.localStones[0] ?? sample(wordSet);
  const focusWord = location?.name.split(" ")[0] ?? sample(wordSet);

  return {
    settlement: `${sample(wordSet)} ${sample(settlementSuffixes)}`,
    tavern: `${sample(tavernStarts)} ${sample([
      localTree,
      localStone,
      sample(tavernEnds),
    ])}`,
    landmark: `${focusWord} ${sample(landmarkEnds)}`,
  };
};
