//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements, { Button } from "uu5g05-elements";
import Config from "./config/config.js";
import ProgressWidget from "./progress-widget";
import NumberWidget from "./number-widget";
import ActivityWidget from "./activity-widget";
import TableWidget from "./table-widget";
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

const DashboardView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DashboardView",
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
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Uu5Elements.Grid>
          <Uu5Elements.Grid.Item colSpan={2} rowSpan={6}>
            <ProgressWidget value={100} />
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item colSpan={2} rowSpan={6}>
            <ProgressWidget value={25} />
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item colSpan={2} rowSpan={6}>
            <NumberWidget authoritiesOnly />
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item colSpan={6} rowSpan={8}>
            <ActivityWidget authoritiesOnly />
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item colSpan={12}>
            <TableWidget />
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DashboardView };
export default DashboardView;
//@@viewOff:exports
