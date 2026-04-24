import { useState } from "react";
import { WorldData } from "../data";

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

  const generateNewRegion = () => {
    const planetIdx = rollDie(6);
    const mythIdx = rollDie(6);
    const techIdx = rollDie(6);
    const magicIdx = rollDie(6);
    const climateIdx = rollDie(6);
    const drainageIdx = rollDie(6);
    const lifeIdx = rollDie(6); // Added roll for life availability

    const selectedClimate = WorldData.CLIMATES[climateIdx].name;
    const selectedDrainage = WorldData.DRAINAGE[drainageIdx].split(" ")[0];
    const selectedLife = WorldData.LIFE_AVAILABILITY[lifeIdx];

    const trees =
      WorldData.TREES_BY_CLIMATE[
        selectedClimate as keyof typeof WorldData.TREES_BY_CLIMATE
      ] || [];
    const stones =
      WorldData.STONES_BY_DRAINAGE[
        selectedDrainage as keyof typeof WorldData.STONES_BY_DRAINAGE
      ] || [];

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

  return { region, generateNewRegion };
};
