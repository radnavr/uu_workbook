//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import Config from "./config/config.js";
import { RailwayContext } from "./railway-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
function updateTrainLocation(trainId, location, trainLocations) {
  Object.keys(trainLocations).forEach((loc) => {
    trainLocations[loc] = trainLocations[loc].filter((t) => t !== trainId);
    if (loc === location) {
      trainLocations[loc].push(trainId);
    }
  });

  return { ...trainLocations };
}
//@@viewOff:helpers

const RailwayProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RailwayProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [trainLocations, setTrainLocation] = useState({
      depot: [],
      station: [],
      railway: [],
    });

    const defaultValue = {
      movingTrainCapacity: 3,
      trainLocations,
      setTrainToLocation: (location, trainId) => {
        setTrainLocation((prev) => updateTrainLocation(trainId, location, prev));
      },
    };
    //@@viewOff:private

    //@@viewOn:render
    return <RailwayContext.Provider value={defaultValue}>{children}</RailwayContext.Provider> ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RailwayProvider };
export default RailwayProvider;
//@@viewOff:exports
