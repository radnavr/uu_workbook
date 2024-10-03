//@@viewOn:imports
import { createComponent, useDataList, useMemoObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const TrainProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const trainDataList = useDataList({ handlerMap: { load: Calls.listTrains } });
    const providedData = useMemoObject({ trainDataList });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <> {typeof children === "function" ? children(providedData) : children}</>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainProvider };
export default TrainProvider;
//@@viewOff:exports
