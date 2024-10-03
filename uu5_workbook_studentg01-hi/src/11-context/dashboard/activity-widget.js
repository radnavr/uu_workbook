//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import { Box, PlaceholderBox } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px" }),
  box: () => Config.Css.css({ padding: "16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ActivityWidget = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ActivityWidget",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    authoritiesOnly: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    authoritiesOnly: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { authoritiesOnly } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Box className={Css.box()}>
          <PlaceholderBox code={"notification"} />
        </Box>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ActivityWidget };
export default ActivityWidget;
//@@viewOff:exports
