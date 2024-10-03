//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const VEHICLE_TYPES = ["locomotive", "mailWagon", "diningWagon", "firstClassWagon", "secondClassWagon"];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      width: "164px",
      height: "50px",
      marginRight: "8px",
      marginTop: "16px",
      padding: "4px",
      alignContent: "center",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
function resolveColorScheme(type) {
  switch (type) {
    case VEHICLE_TYPES[0]:
      return "steel";
    case VEHICLE_TYPES[1]:
      return "yellow";
    case VEHICLE_TYPES[2]:
      return "brown";
    case VEHICLE_TYPES[3]:
      return "red";
    case VEHICLE_TYPES[4]:
      return "blue";
  }
  return "neutral";
}
//@@viewOff:helpers

const Vehicle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Vehicle",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    type: PropTypes.oneOf(VEHICLE_TYPES).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    type: VEHICLE_TYPES[4],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { type } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

    return (
      <Box {...elementProps} colorScheme={resolveColorScheme(type)} significance={"highlighted"}>
        Vehicle ({type})
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Vehicle };
export default Vehicle;
//@@viewOff:exports
