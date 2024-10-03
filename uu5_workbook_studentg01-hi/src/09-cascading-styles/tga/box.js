//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import { Text } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => {},
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Box = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Box",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    mainText: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { mainText } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    //TODO: The Box is expected to have the width set to 457px, 16px left/right padding, 4px bottom padding, 8px margin and a 2px black border
    //TODO: The header should have a steel colorScheme
    return (
      <div {...attrs}>
        <h2>
          <Text>Box</Text>
        </h2>
        <div>{mainText}</div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Box };
export default Box;
//@@viewOff:exports
