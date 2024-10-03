//@@viewOn:imports
import { createVisualComponent, useContext, useLsi, useScreenSize } from "uu5g05";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
import TrainMonitorContext from "../trains/context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  trainMonitor: (screenSize) =>
    Config.Css.css({
      alignItems: "center",
      backgroundColor: "#2196f3",
      borderRadius: "5px",
      color: "white",
      display: "flex",
      height: "36px",
      justifyContent: "center",
      marginTop: "16px",
      width: screenSize === "xs" || screenSize === "s" ? "100%" : "250px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TrainMonitor = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainMonitor",
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
    const [screenSize] = useScreenSize();
    const [trainMonitor] = useContext(TrainMonitorContext);
    const lsi = useLsi(importLsi);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className={Css.trainMonitor(screenSize)}>
        <span>{`${lsi.TrainMonitor.depot}: ${trainMonitor.depot} | ${lsi.TrainMonitor.station}: ${trainMonitor.station} | ${lsi.TrainMonitor.railway}: ${trainMonitor.railway}`}</span>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainMonitor };
export default TrainMonitor;
//@@viewOff:exports
