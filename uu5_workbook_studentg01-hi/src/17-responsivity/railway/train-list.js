//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import Tile from "./tile";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TrainList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainList",
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
    const { data } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <Uu5TilesElements.Grid data={data}>
          <Tile width={"100%"} size={"l"} />
        </Uu5TilesElements.Grid>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainList };
export default TrainList;
//@@viewOff:exports
