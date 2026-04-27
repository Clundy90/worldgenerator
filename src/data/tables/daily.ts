export const TEMPERATURE_TRACKER = {
  modifiers: {
    Arid: -2,
    Tropical: -1,
    Subtropical: -1,
    Temperate: 0,
    Arctic: 2,
    Polar: 2,
    Oceanic: 0,
    Aquatic: 0,
  },
  levels: [
    {
      name: "Scorching",
      effect:
        "Healing is not possible. You gain one level of exhaustion for every hour in this temperature.",
    },
    { name: "Parching", effect: "Rest is not possible. Healing reduced by half." },
    {
      name: "Hot",
      effect:
        "Rest is not possible without gear or magic. Healing reduced by half if exposed to the elements.",
    },
    {
      name: "Warm",
      effect: "Rest has a chance to not heal fatigue without magic or gear.",
    },
    { name: "Mild", effect: "No severe effects." },
    {
      name: "Cool",
      effect: "You may heal exhaustion at double the rate you normally would.",
    },
    { name: "Chilly", effect: "No severe effects." },
    {
      name: "Cold",
      effect: "Rest has a chance to not heal fatigue without magic or gear.",
    },
    {
      name: "Freezing",
      effect:
        "Rest is not possible without gear or magic. Healing reduced by half if exposed to the elements.",
    },
    { name: "Glacial", effect: "Rest is not possible. Healing reduced by half." },
  ],
};

export const WEATHER_EFFECTS_BY_CLIMATE = {
  Arid: [
    "Sunny",
    "Partly cloudy",
    "Heat wave",
    "Windy",
    "Sandstorm",
    "Unusual weather",
  ],
  Tropical: [
    "Sunny",
    "Cloudy",
    "Fog",
    "Light rain",
    "Heavy rain",
    "Unusual weather",
  ],
  Subtropical: [
    "Sunny",
    "Partly cloudy",
    "Cloudy",
    "Rain",
    "Thunderstorm",
    "Unusual weather",
  ],
  Temperate: [
    "Sunny",
    "Partly cloudy",
    "Cloudy",
    "Fog",
    "Thunderstorm",
    "Unusual weather",
  ],
  Arctic: [
    "Sunny",
    "Cloudy",
    "Light snow",
    "Snow",
    "Heavy snow",
    "Unusual weather",
  ],
  Polar: [
    "Sunny",
    "Cloudy",
    "Light snow",
    "Snow",
    "Heavy snow",
    "Unusual weather",
  ],
  Oceanic: [
    "Still waters",
    "Fair waters",
    "Choppy waters",
    "Rain",
    "Heavy rain",
    "Unusual weather",
  ],
  Aquatic: [
    "Still waters",
    "Fair waters",
    "Choppy waters",
    "Rain",
    "Heavy rain",
    "Unusual weather",
  ],
};
