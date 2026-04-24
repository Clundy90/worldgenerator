// Example of how we'll map his Climate table
export interface Climate {
  id: string;
  name: "Arid" | "Tropical" | "Subtropical" | "Temperate" | "Polar" | "Aquatic";
  description: string;
  modifiers: {
    temp: number;
    survival: "advantage" | "disadvantage" | "none";
  };
}

// Example for the Resource tables
export interface Resource {
  name: string;
  category: "Tree" | "Stone" | "Food";
  climateReq?: string; // Ties a tree to a specific climate
  drainageReq?: string; // Ties a stone to a specific drainage
  description: string;
}
