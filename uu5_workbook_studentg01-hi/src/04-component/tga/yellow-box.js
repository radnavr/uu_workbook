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

const YellowBox = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "YellowBox",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, YellowBox);

    return (
      <div style={{ background: "yellow", border: "1px solid black", height: "128px", margin: "16px", width: "128px" }}>
        This is my new visual component
      </div>
    );

    /*currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {YellowBox.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;*/
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { YellowBox };
export default YellowBox;
//@@viewOff:exports
