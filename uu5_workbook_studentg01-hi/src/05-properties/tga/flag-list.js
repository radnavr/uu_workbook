//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { Flag } from "uu5g05-elements";
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

const FlagList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "FlagList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    countryList: [],
    flagType: "rectangle",
    width: undefined,
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, FlagList);
    //console.log(props)
    return (
      <>
        {props.countryList.map((country) => (
          <Flag key={country} code={country} type={props.flagType} width={props.width} />
        ))}
      </>
    );

    /*currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {FlagList.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;*/
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { FlagList };
export default FlagList;
//@@viewOff:exports
