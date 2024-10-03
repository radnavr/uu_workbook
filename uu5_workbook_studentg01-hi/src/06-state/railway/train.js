//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes } from "uu5g05";
import Config from "./config/config.js";
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
    maxSize: 20,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <div>Visual Component {Train.uu5Tag}</div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Train };
export default Train;
//@@viewOff:exports
