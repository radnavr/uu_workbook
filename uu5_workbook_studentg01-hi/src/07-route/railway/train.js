//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState } from "uu5g05";
import { ActionGroup, Text } from "uu5g05-elements";
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

    function regenerateTrain() {
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

    const [trainStructure, setTrainStructure] = useState(() => regenerateTrain());
    const isInDepot = currentLocation === "depot";

    const actions = [
      {
        children: "Regenerate Train",
        onClick: () => setTrainStructure(regenerateTrain()),
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
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <ActionGroup itemList={actions} />
        <Text>Current location: {currentLocation}</Text>
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
