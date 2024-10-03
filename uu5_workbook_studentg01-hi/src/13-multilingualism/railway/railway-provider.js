//@@viewOn:imports
import { createComponent, useState, useMemoObject } from "uu5g05";
import Config from "./config/config.js";
import { RailwayContext } from "./railway-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
function updateTrainLocation(trainId, location, trainLocations) {
  let result = { ...trainLocations };
  Object.keys(result).forEach((loc) => {
    result[loc] = trainLocations[loc].filter((t) => t !== trainId);
    if (loc === location) {
      result[loc].push(trainId);
    }
  });

  return result;
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

    const defaultValue = useMemoObject({
      movingTrainCapacity: 3,
      trainLocations,
      setTrainToLocation: (location, trainId) => {
        setTrainLocation((prev) => updateTrainLocation(trainId, location, prev));
      },
    });

    //@@viewOff:private

    //@@viewOn:render
    return typeof children === "function" ? (
      children(defaultValue)
    ) : (
      <RailwayContext.Provider value={defaultValue}>{children}</RailwayContext.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RailwayProvider };
export default RailwayProvider;
//@@viewOff:exports
