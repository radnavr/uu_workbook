import { Utils } from "uu5g05";

const [RailwayContext, useRailwayContext] = Utils.Context.create({
  movingTrainCapacity: 0,
  trainLocations: {
    depot: [],
    station: [],
    railway: [],
  },
  setTrainToLocation: () => {},
});

export { RailwayContext, useRailwayContext };
