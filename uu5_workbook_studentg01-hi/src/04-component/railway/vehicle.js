//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { Box } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Vehicle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Vehicle",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    type: PropTypes.oneOf(["locomotive", "mailWagon", "diningWagon", "firstClassWagon", "secondClassWagon"]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    type: "secondClassWagon",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Vehicle);

    return <Box>{props.type}</Box>;

    /*currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {Vehicle.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;*/
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Vehicle };
export default Vehicle;
//@@viewOff:exports
