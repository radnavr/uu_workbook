//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import RouteBar from "../core/route-bar.js";
import Config from "./config/config.js";
import TrainProvider from "../bricks/railway/train-provider.js";
import TrainView from "../bricks/railway/train-view.js";
import TrainMonitorProvider from "../bricks/trains/provider.js";
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

const RailwayMan = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RailwayMan",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <TrainProvider>
          {(trainDataList) => (
            <TrainMonitorProvider trains={trainDataList}>
              <TrainView trains={trainDataList} />
            </TrainMonitorProvider>
          )}
        </TrainProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RailwayMan };
export default RailwayMan;
//@@viewOff:exports
