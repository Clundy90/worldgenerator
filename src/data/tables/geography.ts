/**
 * EZ WORLD GENERATION
 * All the very basic pillars of your world that may change drastically
 * how characters are intended to roleplay.
 */
export const EZ_WORLD_GEN = {
  planet: [
    "Cluster of islands",
    "Large clusters of land",
    "Several larger continents",
    "Larger connected continents",
    "Two giant opposing continents",
    "Supercontinent / Pangea",
  ],
  mythology: [
    "Single or no god",
    "Two gods",
    "Handful of gods",
    "Pantheon of gods",
    "Multiple pantheons",
    "Gods for everything",
  ],
  technology: [
    "Ancient era",
    "Classical era",
    "Medieval era",
    "High medieval era",
    "Renaissance era",
    "Industrial era",
  ],
  magic_prevalence: [
    "None",
    "Very rare",
    "Rare",
    "Commonplace",
    "Widespread",
    "Everywhere",
  ],
};

export const MYTH_GLOSSARY = {
  "Single or no god":
    "Faith is narrow in scope, centralized around a singular divine figure or replaced by secular institutions.",
  "Two gods":
    "Belief is balanced between rival or complementary divine forces, often shaping culture around opposition or duality.",
  "Handful of gods":
    "A small circle of deities governs major domains, giving worship a structured but still personal feel.",
  "Pantheon of gods":
    "Religion is broad, ceremonial, and full of overlapping rites dedicated to many specialized gods.",
  "Multiple pantheons":
    "Several traditions coexist, usually tied to regions, peoples, or political blocs with competing sacred histories.",
  "Gods for everything":
    "Spiritual life is highly granular, with divine patrons attached to nearly every task, trade, and phenomenon.",
};

export const TECH_GLOSSARY = {
  "Ancient era":
    "Stone, bronze, and early iron tools dominate. Knowledge is practical, local, and closely tied to oral tradition.",
  "Classical era":
    "Roads, scripts, formal armies, and civic engineering begin to support larger states and shared culture.",
  "Medieval era":
    "Regional craft, fortified settlements, and guild knowledge shape everyday life more than centralized industry.",
  "High medieval era":
    "Trade expands, institutions mature, and skilled labor becomes increasingly specialized across cities and strongholds.",
  "Renaissance era":
    "Discovery, navigation, art, and natural philosophy accelerate, pushing scholarship and invention into public life.",
  "Industrial era":
    "Mechanization, scaled production, and dense infrastructure rapidly reshape labor, travel, and warfare.",
};

export const MAGIC_GLOSSARY = {
  None: "Magic is absent, forgotten, or dismissed as folklore. Mundane skill and material resources define power.",
  "Very rare":
    "Arcane effects exist, but most people may never witness them directly in their lifetime.",
  Rare: "Magic is known and feared, but practitioners remain scarce and socially significant.",
  Commonplace:
    "Spellcraft is a routine part of life in key professions, settlements, and institutions.",
  Widespread:
    "Magic influences trade, defense, and daily survival across much of the world.",
  Everywhere:
    "Arcane power is embedded in the culture, environment, and assumptions of ordinary life.",
};

/**
 * REGIONAL FEATURES
 * The basic natural traits of a region.
 */
export const CLIMATES = [
  {
    name: "Arid",
    desc: "This region is exceptionally dry and generally devoid of natural sources of water. Days are very hot and nights are very cold",
  },
  {
    name: "Tropical",
    desc: "This area is hot and humid and usually home to many dangerous plants and disease carrying insects.",
  },
  {
    name: "Subtropical",
    desc: "This area is especially humid and suffers frequent rain as well as violent and unpredictable meteorological conditions",
  },
  {
    name: "Temperate",
    desc: "This area is generally moderate and pleasant. Can be home to many varieties of leaf and pine trees as well as beasts.",
  },
  {
    name: "Polar",
    desc: "This area is exceptionally cold and icy. Only the toughest fauna as well as flora can usually survive in this environment.",
  },
  {
    name: "Aquatic",
    desc: "This area on the coast or in the middle of the ocean. Conditions and creatures found may vary.",
  },
];

export const LIFE_AVAILABILITY = [
  "Dead (Deserted, barren wasteland)",
  "Dry (Scarce life, lone wilted plants)",
  "Average (Grasslands, fields, and meadows)",
  "Fertile (Healthy soil and Scattered forests)",
  "Flourishing (Forested area teeming with wildlife)",
  "Wilderness (Dense forests and untamed savage wilds)",
];

export const DRAINAGE = [
  "Severe (Sheer mountain face)",
  "Heavy (Dipping valleys, crags)",
  "Moderate (Rolling hills)",
  "Light (Plains, lowlands)",
  "None (Marsh, swamplands)",
  "Erosion (Floodlands)",
];
