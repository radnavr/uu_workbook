//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import Train from "../railway/train";
import TrainProvider from "../railway/train-provider";
import PositionBar from "../core/position-bar";
import RailwayProvider from "../railway/railway-provider";
import TrainCounter from "../railway/train-counter";
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

let RailwayMan = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RailwayMan",
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
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <PositionBar />
        <RailwayProvider>
          <TrainCounter />
          <TrainProvider>
            {({ trainDataList }) => (
              <>
                {trainDataList.data?.map((train) => (
                  <Train trainStructure={train.data.structure} key={train.data.id} trainId={train.data.id} />
                ))}
              </>
            )}
          </TrainProvider>
        </RailwayProvider>
      </div>
    );
    //@@viewOff:render
  },
});

RailwayMan = withRoute(RailwayMan, { authenticated: true });

//@@viewOn:exports
export { RailwayMan };
export default RailwayMan;
//@@viewOff:exports
