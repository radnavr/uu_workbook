//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const VEHICLE_TYPES = ["locomotive", "mailWagon", "diningWagon", "firstClassWagon", "secondClassWagon"];
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
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
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return <Box {...elementProps}>Vehicle ({type})</Box>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Vehicle };
export default Vehicle;
//@@viewOff:exports
