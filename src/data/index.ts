import * as geography from "./tables/geography";
import * as resources from "./tables/resources";
import * as daily from "./tables/daily";
import * as crafting from "./tables/crafting";
import * as locations from "./locationGenerator";

export const WorldData = {
  ...geography,
  ...resources,
  ...daily,
  ...crafting,
  ...locations,
};
