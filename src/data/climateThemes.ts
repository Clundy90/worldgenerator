export type ClimateTheme = {
  ambientBase: string;
  ambientTexture: string;
  horizon: string;
  headerGlow: string;
  climatePanel: string;
  accentText: string;
  weatherMotion: string;
  previewTone: string;
  colorBursts: string;
};

const baseThemes: Record<string, Omit<ClimateTheme, "weatherMotion">> = {
  Arid: {
    ambientBase:
      "bg-[linear-gradient(180deg,#4a1b0c_0%,#7c2d12_24%,#c2410c_58%,#431407_100%)]",
    ambientTexture: "ambient-dunes",
    horizon:
      "bg-[linear-gradient(180deg,transparent_0%,rgba(251,191,36,0.18)_24%,rgba(249,115,22,0.42)_100%)]",
    headerGlow:
      "shadow-[0_22px_90px_rgba(249,115,22,0.4)] border-amber-100/16",
    climatePanel:
      "bg-[linear-gradient(145deg,rgba(251,191,36,0.26),rgba(249,115,22,0.2),rgba(124,45,18,0.26))]",
    accentText: "text-amber-100",
    previewTone:
      "bg-[linear-gradient(145deg,rgba(253,224,71,0.24),rgba(249,115,22,0.22),rgba(120,53,15,0.24))]",
    colorBursts:
      "bg-[radial-gradient(circle_at_18%_22%,rgba(251,191,36,0.22),transparent_24%),radial-gradient(circle_at_82%_68%,rgba(249,115,22,0.16),transparent_28%)]",
  },
  Tropical: {
    ambientBase:
      "bg-[linear-gradient(180deg,#052e25_0%,#065f46_24%,#16a34a_56%,#052018_100%)]",
    ambientTexture: "ambient-canopy",
    horizon:
      "bg-[linear-gradient(180deg,transparent_0%,rgba(52,211,153,0.18)_24%,rgba(16,185,129,0.36)_100%)]",
    headerGlow:
      "shadow-[0_22px_90px_rgba(16,185,129,0.34)] border-emerald-100/16",
    climatePanel:
      "bg-[linear-gradient(145deg,rgba(34,197,94,0.24),rgba(16,185,129,0.2),rgba(6,78,59,0.24))]",
    accentText: "text-emerald-100",
    previewTone:
      "bg-[linear-gradient(145deg,rgba(110,231,183,0.2),rgba(34,197,94,0.2),rgba(6,78,59,0.24))]",
    colorBursts:
      "bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_24%),radial-gradient(circle_at_78%_70%,rgba(16,185,129,0.16),transparent_28%)]",
  },
  Subtropical: {
    ambientBase:
      "bg-[linear-gradient(180deg,#0b1f3a_0%,#155e75_24%,#0891b2_56%,#102033_100%)]",
    ambientTexture: "ambient-monsoon",
    horizon:
      "bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.18)_24%,rgba(14,165,233,0.34)_100%)]",
    headerGlow:
      "shadow-[0_22px_90px_rgba(14,165,233,0.34)] border-cyan-100/16",
    climatePanel:
      "bg-[linear-gradient(145deg,rgba(34,211,238,0.22),rgba(14,165,233,0.18),rgba(37,99,235,0.18))]",
    accentText: "text-cyan-100",
    previewTone:
      "bg-[linear-gradient(145deg,rgba(125,211,252,0.2),rgba(34,211,238,0.18),rgba(37,99,235,0.2))]",
    colorBursts:
      "bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_80%_74%,rgba(59,130,246,0.16),transparent_28%)]",
  },
  Temperate: {
    ambientBase:
      "bg-[linear-gradient(180deg,#10201f_0%,#166534_24%,#0f766e_56%,#132024_100%)]",
    ambientTexture: "ambient-meadow",
    horizon:
      "bg-[linear-gradient(180deg,transparent_0%,rgba(134,239,172,0.14)_24%,rgba(16,185,129,0.28)_100%)]",
    headerGlow:
      "shadow-[0_22px_90px_rgba(34,197,94,0.28)] border-lime-100/16",
    climatePanel:
      "bg-[linear-gradient(145deg,rgba(163,230,53,0.18),rgba(74,222,128,0.18),rgba(20,83,45,0.22))]",
    accentText: "text-lime-100",
    previewTone:
      "bg-[linear-gradient(145deg,rgba(190,242,100,0.2),rgba(74,222,128,0.18),rgba(15,118,110,0.18))]",
    colorBursts:
      "bg-[radial-gradient(circle_at_18%_18%,rgba(163,230,53,0.16),transparent_24%),radial-gradient(circle_at_76%_72%,rgba(16,185,129,0.14),transparent_28%)]",
  },
  Polar: {
    ambientBase:
      "bg-[linear-gradient(180deg,#071226_0%,#1d4ed8_24%,#38bdf8_54%,#081420_100%)]",
    ambientTexture: "ambient-frost",
    horizon:
      "bg-[linear-gradient(180deg,transparent_0%,rgba(224,242,254,0.14)_24%,rgba(96,165,250,0.28)_100%)]",
    headerGlow:
      "shadow-[0_22px_90px_rgba(96,165,250,0.28)] border-sky-50/18",
    climatePanel:
      "bg-[linear-gradient(145deg,rgba(147,197,253,0.22),rgba(125,211,252,0.18),rgba(15,23,42,0.26))]",
    accentText: "text-sky-50",
    previewTone:
      "bg-[linear-gradient(145deg,rgba(224,242,254,0.2),rgba(147,197,253,0.18),rgba(15,23,42,0.24))]",
    colorBursts:
      "bg-[radial-gradient(circle_at_20%_22%,rgba(224,242,254,0.18),transparent_24%),radial-gradient(circle_at_82%_68%,rgba(96,165,250,0.14),transparent_28%)]",
  },
  Aquatic: {
    ambientBase:
      "bg-[linear-gradient(180deg,#051422_0%,#0f4c81_24%,#06b6d4_56%,#08131d_100%)]",
    ambientTexture: "ambient-tide",
    horizon:
      "bg-[linear-gradient(180deg,transparent_0%,rgba(153,246,228,0.14)_24%,rgba(45,212,191,0.28)_100%)]",
    headerGlow:
      "shadow-[0_22px_90px_rgba(6,182,212,0.3)] border-teal-50/16",
    climatePanel:
      "bg-[linear-gradient(145deg,rgba(45,212,191,0.22),rgba(6,182,212,0.18),rgba(14,116,144,0.22))]",
    accentText: "text-teal-50",
    previewTone:
      "bg-[linear-gradient(145deg,rgba(153,246,228,0.2),rgba(45,212,191,0.18),rgba(14,116,144,0.22))]",
    colorBursts:
      "bg-[radial-gradient(circle_at_16%_20%,rgba(45,212,191,0.18),transparent_24%),radial-gradient(circle_at_80%_72%,rgba(34,211,238,0.14),transparent_28%)]",
  },
};

export const getClimateTheme = (
  climate: string,
  weather: string,
): ClimateTheme => {
  const base = baseThemes[climate] ?? baseThemes.Temperate;
  const normalizedWeather = weather.toLowerCase();

  let weatherMotion = "ambient-wind";

  if (
    normalizedWeather.includes("rain") ||
    normalizedWeather.includes("thunder")
  ) {
    weatherMotion = "ambient-rain";
  } else if (normalizedWeather.includes("snow")) {
    weatherMotion = "ambient-snow";
  } else if (
    normalizedWeather.includes("heat") ||
    normalizedWeather.includes("sunny")
  ) {
    weatherMotion = "ambient-heat";
  } else if (
    normalizedWeather.includes("water") ||
    normalizedWeather.includes("choppy")
  ) {
    weatherMotion = "ambient-wave";
  } else if (normalizedWeather.includes("fog")) {
    weatherMotion = "ambient-mist";
  }

  return {
    ...base,
    weatherMotion,
  };
};
