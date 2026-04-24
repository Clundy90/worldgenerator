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
