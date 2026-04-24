import { WorldData } from "../data";

export const useCrafting = () => {
  const getDieForLevel = (level: number) => {
    // Verbatim logic from his Mastery table
    if (level <= 4) return "d4";
    if (level <= 8) return "d6";
    if (level <= 12) return "d8";
    if (level <= 16) return "d10";
    return "d12";
  };

  const getItemsForMaterial = (materialName: string) => {
    // This searches through all categories (Alchemy, Smithing, etc.)
    // to find what that material can create.
    const allCategories = Object.values(
      WorldData.SPECIAL_MATERIALS_UNUSUAL_ITEMS,
    );
    for (const category of allCategories) {
      const match = category.find(
        (m) => m.material.toLowerCase() === materialName.toLowerCase(),
      );
      if (match) return match.items;
    }
    return null;
  };

  return {
    getDieForLevel,
    getItemsForMaterial,
    rules: WorldData.CRAFTING_CORE_RULES,
  };
};
