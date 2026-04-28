import { useState } from "react";
import { WorldData } from "../data";
import { getClimateLookupKey } from "../data/catalog";

export const useWeatherEngine = () => {
  const [dailyStatus, setDailyStatus] = useState({
    tempName: "",
    tempEffect: "",
    severity: "",
    weatherEffect: "",
  });

  const rollWeather = (currentClimate: string) => {
    const climateKey = getClimateLookupKey(currentClimate);

    // --- TEMPERATURE LOGIC ---
    // Rule: Roll D6 + Climate Modifier
    const tempRoll = Math.floor(Math.random() * 6) + 1;
    const modifier =
      WorldData.TEMPERATURE_TRACKER.modifiers[
        climateKey as keyof typeof WorldData.TEMPERATURE_TRACKER.modifiers
      ] || 0;

    // Indexing the 10-level table (0-9)
    const finalTempIdx = Math.max(0, Math.min(9, tempRoll + modifier));
    const selectedTemp = WorldData.TEMPERATURE_TRACKER.levels[finalTempIdx];

    // --- SEVERITY LOGIC (D100) ---
    // Rule: Mild (-20), Moderate (-10), Major (+10), Severe (+20)
    const sevRoll = Math.floor(Math.random() * 100) + 1;
    let severityLabel = "Moderate";
    if (sevRoll <= 30) severityLabel = "Mild";
    else if (sevRoll <= 60) severityLabel = "Moderate";
    else if (sevRoll <= 85) severityLabel = "Major";
    else severityLabel = "Severe";

    // --- WEATHER TYPE LOGIC ---
    // This pulls from his Climate-specific Weather lists
    const weatherTable = WorldData.WEATHER_EFFECTS_BY_CLIMATE[
      climateKey as keyof typeof WorldData.WEATHER_EFFECTS_BY_CLIMATE
    ] || ["Sunny"];
    const weatherIdx = Math.floor(Math.random() * weatherTable.length);

    const nextStatus = {
      tempName: selectedTemp.name,
      tempEffect: selectedTemp.effect,
      severity: severityLabel,
      weatherEffect: weatherTable[weatherIdx],
    };

    setDailyStatus(nextStatus);
    return nextStatus;
  };

  return { dailyStatus, rollWeather };
};
