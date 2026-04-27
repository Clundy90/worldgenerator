import { useState } from "react";
import { WorldData } from "../data";
import { getStonesForDrainage, getTreesForClimate } from "../data/catalog";

const regionCompatibility = {
  Arid: {
    drainage: ["Severe", "Heavy", "Moderate", "Light"],
    life: ["Dead", "Dry", "Average"],
  },
  Tropical: {
    drainage: ["Heavy", "Moderate", "Light", "None", "Erosion"],
    life: ["Average", "Fertile", "Flourishing", "Wilderness"],
  },
  Subtropical: {
    drainage: ["Heavy", "Moderate", "Light", "Erosion"],
    life: ["Average", "Fertile", "Flourishing", "Wilderness"],
  },
  Temperate: {
    drainage: ["Severe", "Heavy", "Moderate", "Light", "None", "Erosion"],
    life: ["Dry", "Average", "Fertile", "Flourishing", "Wilderness"],
  },
  Polar: {
    drainage: ["Severe", "Heavy", "Moderate", "Light", "Erosion"],
    life: ["Dead", "Dry", "Average"],
  },
  Aquatic: {
    drainage: ["None", "Light", "Moderate", "Erosion"],
    life: ["Average", "Fertile", "Flourishing", "Wilderness"],
  },
} as const;

const proficiencyBonusForLevel = (level: number) =>
  Math.floor((Math.max(1, level) - 1) / 4) + 2;

export const useWorldEngine = () => {
  const [region, setRegion] = useState({
    planet: "",
    mythology: "",
    tech: "",
    magic: "",
    climate: "",
    drainage: "",
    life: "", // Added this to fix the App.tsx error
    localTrees: [] as string[],
    localStones: [] as string[],
  });

  const rollDie = (sides: number) => Math.floor(Math.random() * sides);
  const randomFrom = <T,>(items: T[]) => items[rollDie(items.length)];

  const generateNewRegion = () => {
    const planetIdx = rollDie(6);
    const mythIdx = rollDie(6);
    const techIdx = rollDie(6);
    const magicIdx = rollDie(6);
    const climateIdx = rollDie(6);

    const selectedClimate = WorldData.CLIMATES[climateIdx].name;
    const compatibility =
      regionCompatibility[selectedClimate as keyof typeof regionCompatibility];
    const compatibleDrainage = WorldData.DRAINAGE.filter((entry) =>
      compatibility.drainage.includes(
        entry.split(" ")[0] as (typeof compatibility.drainage)[number],
      ),
    );
    const compatibleLife = WorldData.LIFE_AVAILABILITY.filter((entry) =>
      compatibility.life.includes(
        entry.split(" ")[0] as (typeof compatibility.life)[number],
      ),
    );

    const selectedDrainage = randomFrom(compatibleDrainage).split(" ")[0];
    const selectedLife = randomFrom(compatibleLife);

    const trees = getTreesForClimate(selectedClimate);
    const stones = getStonesForDrainage(selectedDrainage);

    const newRegionData = {
      planet: WorldData.EZ_WORLD_GEN.planet[planetIdx],
      mythology: WorldData.EZ_WORLD_GEN.mythology[mythIdx],
      tech: WorldData.EZ_WORLD_GEN.technology[techIdx],
      magic: WorldData.EZ_WORLD_GEN.magic_prevalence[magicIdx],
      climate: selectedClimate,
      drainage: selectedDrainage,
      life: selectedLife,
      localTrees: trees,
      localStones: stones,
    };

    setRegion(newRegionData);

    // CRITICAL: Return this so App.tsx can read 'climate' immediately!
    return newRegionData;
  };

  return { region, generateNewRegion, proficiencyBonusForLevel };
};
