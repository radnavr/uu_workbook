//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Content } from "uu5g05";
import Config from "./config/config.js";
import Vehicle from "./vehicle.js";
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

const Train = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Train",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    location: PropTypes.oneOf(["depot", "station", "railway"]),
    vehicles: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    location: "depot",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    const orderedTrain = (arr) => {
      if (!arr.includes("locomotive")) return false;
      if (arr.length === 1) return arr;
      if (arr.at(0) === "locomotive") return arr;

      const locomotive = arr.filter((vehicle) => vehicle === "locomotive");
      const wagoons = arr.filter((vehicle) => vehicle !== "locomotive");

      return [...locomotive, ...wagoons];
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Train);

    return (
      <>
        <h4>Location: {props.location}</h4>
        {orderedTrain(props.vehicles).map((vehicle, ind) => (
          <Vehicle key={ind} type={vehicle} />
        ))}
      </>
    );

    /*currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {Train.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;*/
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Train };
export default Train;
//@@viewOff:exports
