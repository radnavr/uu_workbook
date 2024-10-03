//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useUpdateEffect, useEffect } from "uu5g05";
import { ActionGroup, Badge, Text } from "uu5g05-elements";
import Config from "./config/config.js";
import { getRandomNumber } from "./railway-utils";
import Vehicle from "./vehicle";
import { useRailwayContext } from "./railway-context";
//@@viewOff:imports

//@@viewOn:constants
const LOCATIONS = ["depot", "station", "railway"];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ padding: "16px" }),
  train: () =>
    Config.Css.css({
      display: "flex",
      flexWrap: "wrap",
    }),
};
//@@viewOff:css

//@@viewOn:helpers

function resolveMovingTo(currentLocation, nextLocation) {
  if (currentLocation === "depot") return "N/A";
  if (currentLocation === "station") return "N/A";

  return nextLocation === "depot" ? "depot" : "station";
}

function getActions(currentLocation, nextLocation, isInDepot, isInStation, setLocation) {
  return [
    {
      children: (
        <Text>
          Current location:{" "}
          <Badge size={"xl"} colorScheme={"positive"}>
            {Utils.String.capitalize(currentLocation)}
          </Badge>
        </Text>
      ),
      significance: "subdued",
    },
    {
      children: (
        <Text>
          Moving to:{" "}
          <Badge size={"xl"} colorScheme={"positive"}>
            {Utils.String.capitalize(resolveMovingTo(currentLocation, nextLocation))}
          </Badge>
        </Text>
      ),
      significance: "subdued",
    },
    {
      divider: true,
    },
    {
      children: "Send to depot",
      icon: "uugds-home",
      onClick: () => setLocation("depot"),
      disabled: isInDepot,
    },
    {
      children: "Send on the railway",
      icon: "uugdsstencil-navigation-portal",
      onClick: () => setLocation("railway"),
      disabled: !isInDepot && !isInStation,
    },
  ];
}
//@@viewOff:helpers

const Train = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Train",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    location: PropTypes.oneOf(LOCATIONS).isRequired,
    maxSize: PropTypes.number,
    trainStructure: PropTypes.arrayOf(PropTypes.string),
    trainId: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    maxSize: 20,
    location: "depot",
    trainStructure: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { location, maxSize, trainId, trainStructure } = props;
    const [currentLocation, setCurrentLocation] = useState(location);
    const [nextLocation, setNextLocation] = useState(location);
    const { setTrainToLocation } = useRailwayContext();

    const isInDepot = currentLocation === "depot";
    const isInStation = currentLocation === "station";

    useUpdateEffect(() => {
      setCurrentLocation("railway");
      const timeout = getRandomNumber(40, 10);
      const tid = setTimeout(() => setCurrentLocation(nextLocation === "depot" ? "depot" : "station"), timeout * 1000);

      return () => clearTimeout(tid);
    }, [nextLocation]);

    useEffect(() => {
      setTrainToLocation(currentLocation, trainId);
    }, [currentLocation, trainId]);

    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <ActionGroup itemList={getActions(currentLocation, nextLocation, isInDepot, isInStation, setNextLocation)} />
        <div className={Css.train()}>
          {trainStructure.map((vehicle) => (
            <Vehicle key={vehicle.id} type={vehicle.type} />
          ))}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Train };
export default Train;
//@@viewOff:exports
