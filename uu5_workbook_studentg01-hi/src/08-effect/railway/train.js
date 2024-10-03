//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState } from "uu5g05";
import { ActionGroup, Badge, Text } from "uu5g05-elements";
import Config from "./config/config.js";
import { getRandCarType, getRandomNumber } from "./railway-utils";
import Vehicle from "./vehicle";
//@@viewOff:imports

//@@viewOn:constants
const LOCATIONS = ["depot", "station", "railway"];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
function regenerateTrain(maxSize) {
  let result = [{ type: "locomotive", id: Utils.String.generateId() }];
  const vehicleCount = getRandomNumber(maxSize, 10) - 1;

  for (let i = 0; i < vehicleCount; i++) {
    result.push({ type: getRandCarType(), id: Utils.String.generateId() });
  }

  return result.sort((a, b) => {
    if (a.type === "locomotive") return -1;
    if (b.type === "locomotive") return 1;
    return a.type.localeCompare(b.type);
  });
}
function getActions(currentLocation, isInDepot, setTrainStructure, setLocation, maxSize) {
  return [
    {
      children: (
        <Text>
          Current location:{" "}
          <Badge size={"xl"} colorScheme={"positive"}>
            {currentLocation}
          </Badge>
        </Text>
      ),
      significance: "subdued",
    },
    {
      divider: true,
    },
    {
      children: "Regenerate Train",
      onClick: () => setTrainStructure(regenerateTrain(maxSize)),
      disabled: !isInDepot,
      icon: "uugds-refresh",
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
      disabled: !isInDepot,
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    maxSize: 40,
    location: "depot",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { location, maxSize } = props;
    const [currentLocation, setLocation] = useState(location);

    const [trainStructure, setTrainStructure] = useState(() => regenerateTrain(maxSize));
    const isInDepot = currentLocation === "depot";

    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <ActionGroup itemList={getActions(currentLocation, isInDepot, setTrainStructure, setLocation, maxSize)} />

        {trainStructure.map((vehicle) => (
          <Vehicle key={vehicle.id} type={vehicle.type} />
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Train };
export default Train;
//@@viewOff:exports
