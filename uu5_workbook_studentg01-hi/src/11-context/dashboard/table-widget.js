//@@viewOn:imports
import { createVisualComponent, Utils, useDataList } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import { ActionGroup, Box } from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
const columns = [
  {
    value: "name",
    header: "Name",
    minWidth: 250,
    maxWidth: 350,
  },
  {
    value: "gender",
    header: "Gender",
    minWidth: 100,
  },
  {
    value: "company",
    header: "Company",
  },
];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px" }),
  box: () => Config.Css.css({ padding: "16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TableWidget = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TableWidget",
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
    const { data } = useDataList({ handlerMap: { load: Calls.listOnlinePeople } });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Box className={Css.box()}>
          <ActionGroup itemList={[{ children: "Logout all", onClick: () => {}, primary: true }]} />
          {data && <Uu5TilesElements.Table data={data} columnList={columns} />}
        </Box>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TableWidget };
export default TableWidget;
//@@viewOff:exports
