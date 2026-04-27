import { WorldData } from ".";

export type InspectionRecord = {
  name: string;
  category: string;
  description: string;
  context: string[];
};

const CLIMATE_ALIASES: Record<string, string> = {
  Polar: "Arctic",
  Aquatic: "Oceanic",
};

const normalizeKey = (value: string) =>
  value.toUpperCase().replace(/[\s/_-]/g, "");

const createMembershipMap = (groups: Record<string, string[]>) => {
  const membership = new Map<string, string[]>();

  for (const [group, items] of Object.entries(groups)) {
    for (const item of items) {
      const existing = membership.get(item) ?? [];
      membership.set(item, [...existing, group]);
    }
  }

  return membership;
};

const treeClimateMap = createMembershipMap(WorldData.TREES_BY_CLIMATE);
const stoneDrainageMap = createMembershipMap(WorldData.STONES_BY_DRAINAGE);

const glossarySources = [
  {
    category: "Flora",
    data: WorldData.TREE_GLOSSARY as Record<string, string>,
  },
  {
    category: "Geology",
    data: WorldData.STONE_GLOSSARY as Record<string, string>,
  },
  {
    category: "Mythology",
    data: WorldData.MYTH_GLOSSARY as Record<string, string>,
  },
  {
    category: "Technology",
    data: WorldData.TECH_GLOSSARY as Record<string, string>,
  },
  {
    category: "Magic",
    data: WorldData.MAGIC_GLOSSARY as Record<string, string>,
  },
].filter((source) => source.data);

export const getClimateLookupKey = (climateName: string) =>
  CLIMATE_ALIASES[climateName] ?? climateName;

export const getTreesForClimate = (climateName: string) =>
  WorldData.TREES_BY_CLIMATE[
    getClimateLookupKey(climateName) as keyof typeof WorldData.TREES_BY_CLIMATE
  ] ?? [];

export const getStonesForDrainage = (drainageName: string) =>
  WorldData.STONES_BY_DRAINAGE[
    drainageName as keyof typeof WorldData.STONES_BY_DRAINAGE
  ] ?? [];

export const getClimateDescription = (climateName: string) =>
  WorldData.CLIMATES.find((entry) => entry.name === climateName)?.desc ?? "";

export const getInspectionRecord = (name: string): InspectionRecord => {
  const searchKey = normalizeKey(name);

  for (const glossary of glossarySources) {
    const match = Object.keys(glossary.data).find(
      (entry) => normalizeKey(entry) === searchKey,
    );
    if (match) {
      const context: string[] = [];
      const climateMatches = treeClimateMap.get(match);
      const stoneMatches = stoneDrainageMap.get(match);

      if (climateMatches) {
        context.push(`Found in ${climateMatches.join(", ")} climates`);
      }

      if (stoneMatches) {
        context.push(`Common in ${stoneMatches.join(", ")} drainage`);
      }

      return {
        name,
        category: glossary.category,
        description: glossary.data[match],
        context,
      };
    }
  }

  const climate = WorldData.CLIMATES.find(
    (entry) => normalizeKey(entry.name) === searchKey,
  );
  if (climate) {
    return {
      name: climate.name,
      category: "Climate",
      description: climate.desc,
      context: [`Supports ${getTreesForClimate(climate.name).length} local flora rolls`],
    };
  }

  const drainage = WorldData.DRAINAGE.find(
    (entry) => normalizeKey(entry.split(" ")[0]) === searchKey,
  );
  if (drainage) {
    const drainageName = drainage.split(" ")[0];
    const detail = drainage.match(/\((.*)\)/)?.[1];

    return {
      name: drainageName,
      category: "Drainage",
      description: detail
        ? `${drainageName} terrain usually presents as ${detail.toLowerCase()}.`
        : `${drainageName} terrain affects erosion, movement, and available stone.`,
      context: [`Provides ${getStonesForDrainage(drainageName).length} stone results`],
    };
  }

  const life = WorldData.LIFE_AVAILABILITY.find(
    (entry) => normalizeKey(entry) === searchKey,
  );
  if (life) {
    const detail = life.match(/\((.*)\)/)?.[1];

    return {
      name: life.split(" ")[0],
      category: "Life",
      description: detail ?? "Life density shapes what the party can forage or encounter.",
      context: ["Derived from the base regional life availability table"],
    };
  }

  const treeClimates = treeClimateMap.get(name);
  if (treeClimates) {
    return {
      name,
      category: "Flora",
      description: `${name} appears in ${treeClimates.join(", ").toLowerCase()} regions. No dedicated glossary note exists yet, but it is part of the native flora table.`,
      context: [`Climate bands: ${treeClimates.join(", ")}`],
    };
  }

  const stoneDrainage = stoneDrainageMap.get(name);
  if (stoneDrainage) {
    return {
      name,
      category: "Geology",
      description: `${name} is a local stone result tied to ${stoneDrainage.join(", ").toLowerCase()} drainage conditions. No dedicated glossary note exists yet.`,
      context: [`Drainage bands: ${stoneDrainage.join(", ")}`],
    };
  }

  return {
    name,
    category: "Archive",
    description:
      "No matching glossary entry was found for this result. The source table still rolled correctly, but this item does not have a richer note attached yet.",
    context: ["Check glossary coverage if you want deeper lore for this entry"],
  };
};
