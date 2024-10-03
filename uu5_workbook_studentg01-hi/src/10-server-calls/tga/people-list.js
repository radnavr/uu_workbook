//@@viewOn:imports
import { createVisualComponent, Utils, useDataList, useState } from "uu5g05";
import { Button } from "uu5g05-elements";
import Calls from "calls";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PeopleList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PeopleList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const { state, data } = useDataList(
      {
        handlerMap: { load: Calls.listOnlinePeople },
      },
      [lastUpdated],
    );

    function handleReload() {
      setLastUpdated(new Date());
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Button onClick={() => handleReload()}>Reload</Button>
        {state === "ready" && data && data.map((item) => <div key={item.data.id}>{item.data.name}</div>)}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PeopleList };
export default PeopleList;
//@@viewOff:exports
