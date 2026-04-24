/**
 * QUESTIONABLE ARCANA INSPIRED CRAFTING RULES
 * Transcribed verbatim from the World Building Tables document.
 */

export const CRAFTING_CORE_RULES = {
  default_rate: "5gp per 8 hour crafting session",
  material_cost: "50% of market value in raw materials",

  changes: {
    lead_artisans:
      "Only one character needs to be proficient in the tools in a group effort. An amount of assistants equal to the lead artisan’s proficiency bonus are allowed to help him.",
    charges:
      "Instead of paying 50% market value, use crafting charges. One full 8 hour session expands a single charge. Charges cost nothing but are refilled in civilization or by survival rolls. Each charge has a bulk value of 25lbs.",
    locations:
      "Access to appropriate facilities (forge, kitchen, lab) increases progress by 10gp per session.",
    quick_crafting:
      "Items worth 1gp or less can be made in 1 hour (short rest). Requires tools/proficiency, costs no charges, but cannot be improved by assistants.",
  },
};

export const PROFICIENCY_DISE_MASTERY = [
  { levels: "1st - 4th", die: "1d4" },
  { levels: "5th - 8th", die: "1d6" },
  { levels: "9th - 12th", die: "1d8" },
  { levels: "13th - 16th", die: "1d10" },
  { levels: "17th - 20th", die: "1d12" },
];

export const SPECIAL_MATERIALS_UNUSUAL_ITEMS = {
  alchemy_poisoner: [
    {
      material: "Herbs of Infusion",
      items: ["Infusion potions", "Debilitating poison"],
    },
    {
      material: "Herbs of Restoration",
      items: ["Restoration potions", "Crippling poison"],
    },
    {
      material: "Herbs of Healing",
      items: ["Healing potions (adds 1d4+1)", "Harming poison"],
    },
    {
      material: "Herbs of Draft",
      items: ["Draft potions", "Vulnerability Poison"],
    },
    { material: "Mandrake", items: ["Enhancing Oil"] },
    { material: "Fern Flower", items: ["Luck Extract"] },
    { material: "Seer’s Root", items: ["Seer syrup", "Seer’s curse"] },
    { material: "Smoke Grass", items: ["Smoke stick"] },
    { material: "Lightning rock", items: ["Thunderstone"] },
    { material: "Tangle Weeds", items: ["Tanglefoot bag"] },
  ],
  mason_potter: [
    {
      material: "Glowstone",
      items: ["Glowing Pebbles", "Glowing Statue", "Glowing Pot"],
    },
  ],
  carpenter_woodcarver: [
    {
      material: "Ebony",
      items: [
        "Ebony Club",
        "Greatclub",
        "Quarterstaff",
        "Spear",
        "Shortbow",
        "Longbow",
      ],
    },
    {
      material: "Feather Tree",
      items: ["Feather Shields", "Feather Containers", "Feather Vehicles"],
    },
    {
      material: "Ironwood",
      items: [
        "Ironwood Medium Armor",
        "Ironwood Heavy Armor",
        "Ironwood shield",
      ],
    },
    {
      material: "Holly",
      items: [
        "Holly Club",
        "Greatclub",
        "Quarterstaff",
        "Spear",
        "Holly Arrows",
      ],
    },
    { material: "Obsidian", items: ["Obsidian Arrows", "Obsidian greatclub"] },
  ],
  smith_jeweler: [
    {
      material: "Adamantine",
      items: [
        "Adamantine Armor",
        "Adamantine Weapons",
        "Adamantine Ammunition",
      ],
    },
    {
      material: "Mithral",
      items: ["Mithral Medium armor", "Mithral Heavy armor"],
    },
    {
      material: "Orichalcum",
      items: ["Orichalcum weapon", "Orichalcum armor", "Orichalcum Jewelry"],
    },
    { material: "Sister Stone", items: ["Recalling Weapon"] },
    { material: "Monster Bone", items: ["Monster Bone Jewelry"] },
  ],
};
