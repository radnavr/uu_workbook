//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
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
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return <Box {...elementProps}>Vehicle</Box>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Vehicle };
export default Vehicle;
//@@viewOff:exports
