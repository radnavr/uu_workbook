//@@viewOn:imports
import { createVisualComponent, useLsi, Utils } from "uu5g05";
import { InfoGroup } from "uu5g05-elements";
import Config from "./config/config.js";
import { useRailwayContext } from "./railway-context";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ padding: "16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TrainCounter = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainCounter",
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
    const railwayContext = useRailwayContext();
    const locationLsi = useLsi(importLsi, ["Uu5Workbook.Railway"]);

    const itemList = Object.keys(railwayContext.trainLocations).map((location) => ({
      subtitle: locationLsi[location],
      title: railwayContext.trainLocations[location].length + "",
    }));
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <InfoGroup itemList={itemList} itemDirection={"horizontal"} size={"xl"} />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainCounter };
export default TrainCounter;
//@@viewOff:exports
