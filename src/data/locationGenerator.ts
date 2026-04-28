export type RegionContext = {
  planet: string;
  mythology: string;
  tech: string;
  magic: string;
  climate: string;
  drainage: string;
  life: string;
  localTrees: string[];
  localStones: string[];
};

export type GeneratedLocation = {
  name: string;
  category: string;
  description: string;
  hooks: string[];
  tags: string[];
};

type LocationTemplate = {
  name: string;
  category: string;
  climates?: string[];
  drainage?: string[];
  life?: string[];
  minTechIndex?: number;
  maxTechIndex?: number;
  description: (region: RegionContext) => string;
  hooks: (region: RegionContext) => string[];
};

const technologyOrder = [
  "Ancient era",
  "Classical era",
  "Medieval era",
  "High medieval era",
  "Renaissance era",
  "Industrial era",
];

const getTechIndex = (tech: string) => technologyOrder.indexOf(tech);
const getLifeBand = (life: string) => life.split(" ")[0];
const sample = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const pickTree = (region: RegionContext) => region.localTrees[0] ?? "gnarled scrub";
const pickStone = (region: RegionContext) => region.localStones[0] ?? "weathered stone";

const templates: LocationTemplate[] = [
  {
    name: "Roadside Tavern",
    category: "Settlement",
    climates: ["Temperate", "Subtropical", "Tropical", "Arid"],
    drainage: ["Light", "Moderate", "Heavy"],
    life: ["Average", "Fertile", "Flourishing"],
    minTechIndex: 1,
    description: (region) =>
      `A hard-used tavern sits beside the nearest trade road, its beams cut from ${pickTree(region)} and its hearth laid with ${pickStone(region)}. Travelers use it as neutral ground to trade rumors, hire guards, and decide whether the surrounding ${region.climate.toLowerCase()} country is worth the risk.`,
    hooks: (region) => [
      `A caravan master is paying for guides who know the ${region.drainage.toLowerCase()} ground nearby.`,
      `The innkeeper claims a regular vanished after boasting about a shortcut through the ${region.life.toLowerCase()} outskirts.`,
      `A quiet table in the back is reserved for agents of the local ${region.mythology.toLowerCase()}.`,
    ],
  },
  {
    name: "Town Square",
    category: "Settlement",
    climates: ["Temperate", "Subtropical", "Tropical", "Arid"],
    drainage: ["Light", "Moderate"],
    life: ["Average", "Fertile", "Flourishing"],
    minTechIndex: 1,
    description: (region) =>
      `The town square is the social heart of a settled district, lined with stalls, notices, and public arguments. The architecture reflects a ${region.tech.toLowerCase()} culture that has grown confident enough to gather openly, even while the surrounding region still answers to ${region.magic.toLowerCase()} magic and practical survival.`,
    hooks: (region) => [
      "A magistrate is desperate for discreet adventurers before panic spreads through the market.",
      `A preacher is drawing crowds by claiming the land's ${region.climate.toLowerCase()} temperament is a divine warning.`,
      `Merchants are bidding on a rare shipment made from local ${pickStone(region)} and want armed escorts.`,
    ],
  },
  {
    name: "Middle of Nowhere",
    category: "Wilderness",
    description: (region) =>
      `There is no structure here, only distance. The party finds itself in an exposed stretch of ${region.climate.toLowerCase()} terrain where the ${region.drainage.toLowerCase()} ground offers little comfort and every sound carries farther than it should. It is the kind of place where travel time feels longer, tempers shorten, and anything spotted on the horizon matters.`,
    hooks: () => [
      "A lone rider is visible far off and seems to be shadowing the party's route.",
      "Fresh tracks cross the path, but they begin and end where no cover exists.",
      "An old campsite shows signs that its former occupants left in a hurry.",
    ],
  },
  {
    name: "Crossroads Shrine",
    category: "Landmark",
    drainage: ["Light", "Moderate", "Heavy"],
    minTechIndex: 0,
    description: (region) =>
      `At a well-traveled meeting of roads stands a shrine weathered by generations of petitioners. Offerings of local ${pickTree(region)} sap, chipped ${pickStone(region)}, and travel charms crowd its base, suggesting that even practical folk here leave room for the sacred.`,
    hooks: (region) => [
      `Pilgrims insist the shrine's blessing has faded since the rise of ${region.tech.toLowerCase()} customs.`,
      "Someone recently stole a sacred object and every traveler is now under suspicion.",
      `An exhausted messenger begs the party to deliver a vow before nightfall changes the omen.`,
    ],
  },
  {
    name: "Fishing Pier",
    category: "Settlement",
    climates: ["Aquatic", "Tropical", "Subtropical", "Temperate"],
    drainage: ["None", "Light", "Moderate"],
    life: ["Average", "Fertile", "Flourishing"],
    description: (region) =>
      `A timber pier reaches into uncertain water while nets, traps, and bait buckets sway in the salt wind. Work never fully stops here, because the nearby waters decide the mood of the settlement as surely as any lord or council.`,
    hooks: (region) => [
      `The catch has turned strange since a ${region.magic.toLowerCase()} phenomenon was seen offshore.`,
      "A ferryman refuses to make the last crossing of the evening unless properly guarded.",
      `A body washed in with tokens tied to the local ${region.mythology.toLowerCase()}.`,
    ],
  },
  {
    name: "Caravan Camp",
    category: "Travel",
    climates: ["Arid", "Temperate", "Subtropical"],
    drainage: ["Severe", "Heavy", "Moderate", "Light"],
    minTechIndex: 0,
    description: (region) =>
      `Circles of wagons and cookfires mark a caravan camp preparing either for first light or a forced retreat. Traders have adapted to the region's ${region.climate.toLowerCase()} hardships, but the mood remains tense because every route forward also narrows the options for turning back.`,
    hooks: (region) => [
      "A merchant prince wants guards for a private wagon no one else is allowed to inspect.",
      `The scouts argue over whether the ${region.drainage.toLowerCase()} route or the open trail is less dangerous.`,
      `One caravan guard swears the camp is being watched by something that moves only during dust or fog.`,
    ],
  },
  {
    name: "Frontier Watchtower",
    category: "Military",
    drainage: ["Severe", "Heavy", "Moderate"],
    minTechIndex: 1,
    description: (region) =>
      `A squat watchtower rises from a defensible overlook, built to make a small garrison seem larger than it is. From here the surrounding ${region.climate.toLowerCase()} land can be watched for raiders, monsters, or the first sign that local order is beginning to fail.`,
    hooks: () => [
      "The garrison is understrength and pretending otherwise to avoid inviting attack.",
      "A signal fire is prepared, but the captain fears lighting it would start a wider conflict.",
      "A prisoner in the cellar offers useful intelligence in exchange for escape.",
    ],
  },
  {
    name: "Hidden Druid Grove",
    category: "Sacred",
    climates: ["Temperate", "Subtropical", "Tropical", "Polar"],
    life: ["Fertile", "Flourishing", "Wilderness"],
    maxTechIndex: 3,
    description: (region) =>
      `The grove is half sanctuary and half negotiation chamber between mortals and the older powers of the land. Ancient growth, especially ${pickTree(region)}, has been shaped rather than cut, and even the silence feels deliberate.`,
    hooks: (region) => [
      `The wardens distrust anyone connected to ${region.tech.toLowerCase()} institutions.`,
      "A sacred beast is missing, and the grove fears what it means more than the loss itself.",
      `The grove can offer shelter, but only if the party agrees to carry out a task that local settlers would hate.`,
    ],
  },
  {
    name: "Mining Outpost",
    category: "Industry",
    drainage: ["Severe", "Heavy", "Moderate"],
    minTechIndex: 2,
    description: (region) =>
      `A rugged outpost clings to the rock where prospectors chase seams of ${pickStone(region)} and anything rarer hidden below it. The settlement is practical, dirty, and just wealthy enough for everyone to worry about who will try to take it.`,
    hooks: () => [
      "The latest tunnel broke into something older than the miners expected.",
      "Workers are disappearing between shifts, but no one wants the operation shut down.",
      "A prospector offers the party a side deal that would anger the outpost owner if discovered.",
    ],
  },
  {
    name: "Marsh Ferry Landing",
    category: "Travel",
    climates: ["Aquatic", "Subtropical", "Tropical"],
    drainage: ["None", "Light", "Erosion"],
    life: ["Average", "Fertile", "Flourishing", "Wilderness"],
    description: (region) =>
      `Rotted planks, tied skiffs, and a bell for calling the ferryman define this damp little crossing. The place feels temporary even though it has probably stood for years, because water and mud keep rewriting the edges of the world around it.`,
    hooks: () => [
      "The ferryman knows every local secret and charges extra for the dangerous ones.",
      "Something in the reeds mimics human voices after sunset.",
      "A noble's courier went missing on the last crossing, and the satchel matters more than the body.",
    ],
  },
  {
    name: "Abandoned Farmstead",
    category: "Ruin",
    climates: ["Temperate", "Subtropical", "Arid"],
    drainage: ["Light", "Moderate"],
    life: ["Dry", "Average", "Fertile"],
    minTechIndex: 1,
    description: (region) =>
      `A farmhouse, split fencing, and fallow plots mark a place that was once ordinary enough to be ignored. That familiarity is what makes it unsettling now: whatever drove the residents away did so in land that should have supported them.`,
    hooks: (region) => [
      `The fields failed after an unexplained shift in weather tied to the ${region.climate.toLowerCase()} season.`,
      "There are signs that someone still returns here, but only at night.",
      "A hidden cellar contains supplies that suggest the family expected a siege, not a drought or bad harvest.",
    ],
  },
  {
    name: "Cliffside Monastery",
    category: "Sanctuary",
    climates: ["Temperate", "Subtropical", "Polar", "Arid"],
    drainage: ["Severe", "Heavy"],
    minTechIndex: 1,
    description: (region) =>
      `The monastery clings to high stone and narrow stairs, built where devotion and isolation reinforce one another. Its halls are austere, but pilgrims still come seeking counsel, relics, or refuge from the more chaotic parts of the world below.`,
    hooks: (region) => [
      `The monks guard a text that could embarrass one branch of the local ${region.mythology.toLowerCase()}.`,
      "A bell has not rung in days, and the lower villages are growing nervous.",
      "A novice wants to flee the order and begs the party for quiet help.",
    ],
  },
  {
    name: "Standing Stones",
    category: "Landmark",
    maxTechIndex: 4,
    description: (region) =>
      `A ring of old standing stones rises from the land with no sign that the present age could recreate them. Travelers pause here without meaning to, partly because the place is striking and partly because every local story insists something important once happened on this ground.`,
    hooks: (region) => [
      `The stones react differently when exposed to ${region.magic.toLowerCase()} magic.`,
      "A nearby village wants them torn down, while local elders insist that would invite disaster.",
      "An armed group plans to meet here at dusk because all sides consider the site neutral.",
    ],
  },
  {
    name: "Hunter's Lodge",
    category: "Wilderness",
    climates: ["Temperate", "Subtropical", "Polar"],
    life: ["Average", "Fertile", "Flourishing", "Wilderness"],
    drainage: ["Heavy", "Moderate", "Light"],
    description: (region) =>
      `Built from local ${pickTree(region)} and reinforced with ${pickStone(region)}, this lodge serves trappers, rangers, and anyone foolish enough to think the wild can be learned in a weekend. Trophy boards and half-finished maps suggest its regulars know the region well enough to fear it properly.`,
    hooks: () => [
      "A renowned hunter has failed to return from a routine pursuit.",
      "The lodge is hosting rivals who are one insult away from violence.",
      "Something has begun preying on hunting parties while avoiding every obvious trap.",
    ],
  },
];

const isCompatible = (template: LocationTemplate, region: RegionContext) => {
  const techIndex = getTechIndex(region.tech);
  const lifeBand = getLifeBand(region.life);

  if (template.climates && !template.climates.includes(region.climate)) {
    return false;
  }

  if (template.drainage && !template.drainage.includes(region.drainage)) {
    return false;
  }

  if (template.life && !template.life.includes(lifeBand)) {
    return false;
  }

  if (template.minTechIndex !== undefined && techIndex < template.minTechIndex) {
    return false;
  }

  if (template.maxTechIndex !== undefined && techIndex > template.maxTechIndex) {
    return false;
  }

  return true;
};

export const generateLocation = (region: RegionContext): GeneratedLocation => {
  const pool = templates.filter((template) => isCompatible(template, region));
  const selected = sample(pool.length ? pool : templates);

  return {
    name: selected.name,
    category: selected.category,
    description: selected.description(region),
    hooks: selected.hooks(region),
    tags: [region.climate, region.drainage, getLifeBand(region.life), region.tech],
  };
};
