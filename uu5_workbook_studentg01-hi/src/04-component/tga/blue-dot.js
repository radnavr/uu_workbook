//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
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

const BlueDot = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BlueDot",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, BlueDot);

    return <div style={{ backgroundColor: "blue", borderRadius: "16px", height: "32px", width: "32px" }}></div>;
    /*currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {BlueDot.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;*/
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BlueDot };
export default BlueDot;
//@@viewOff:exports
