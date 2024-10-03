//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, useScreenSize, Utils } from "uu5g05";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
import { Badge } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
const getDesktopColor = (vehicleType) => {
  if (vehicleType === "locomotive") return "#9D91FB";
  if (vehicleType === "mailWagon") return "#77DFB4";
  if (vehicleType === "diningWagon") return "#ED80AA";
  if (vehicleType === "firstClassWagon") return "#F9C72B";
  return "#41B1F9";
};

const getMobileColor = (vehicleType) => {
  if (vehicleType === "locomotive") return "grey";
  if (vehicleType === "mailWagon") return "grey";
  if (vehicleType === "diningWagon") return "purple";
  if (vehicleType === "firstClassWagon") return "yellow";
  return "green";
};
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  vehicle: (vehicleType) =>
    Config.Css.css({
      alignItems: "center",
      backgroundColor: getDesktopColor(vehicleType),
      borderRadius: "5px",
      color: "white",
      display: "flex",
      fontWeight: "bold",
      height: "75px",
      justifyContent: "center",
      margin: "5px",
      width: "200px",
    }),

  badge: () =>
    Config.Css.css({
      margin: "3px",
      padding: "5px",
    }),
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
    const lsi = useLsi(importLsi);
    const [screenSize] = useScreenSize();

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        {screenSize === "xs" || screenSize === "s" ? (
          <Badge colorScheme={getMobileColor(props.type)} className={Css.badge()} size="l">
            {lsi.TrainCar[props.type]}
          </Badge>
        ) : (
          <div className={Css.vehicle(props.type)}>
            <span>{lsi.TrainCar[props.type]}</span>
          </div>
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Vehicle };
export default Vehicle;
//@@viewOff:exports
