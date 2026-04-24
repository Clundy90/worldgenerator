import * as geography from "./tables/geography";
import * as resources from "./tables/resources";
import * as daily from "./tables/daily";
import * as crafting from "./tables/crafting";

export const WorldData = {
  ...geography,
  ...resources,
  ...daily,
  ...crafting,
};
