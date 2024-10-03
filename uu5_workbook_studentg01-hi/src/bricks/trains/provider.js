//@@viewOn:imports
import { createComponent, useState, useEffect } from "uu5g05";
//import Calls from "calls";
import Config from "../config/config";
import Context from "./context";
//@@viewOff:imports

export const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [trainMonitor, setTrainMonitor] = useState({
      depot: 0,
      station: 0,
      railway: 0,
    });

    const trainCount = trainMonitor.depot + trainMonitor.station + trainMonitor.railway;

    useEffect(() => {
      if (props.trains.data) {
        if (props.trains.data.length > trainCount && trainCount > 0) {
          setTrainMonitor({ ...trainMonitor, depot: trainMonitor.depot + 1 });
        } else {
          setTrainMonitor({ ...trainMonitor, depot: props.trains.data.length });
        }
      }
    }, [props.trains.data]);

    //@@viewOff:private

    //@@viewOn:render
    return <Context.Provider value={[trainMonitor, setTrainMonitor]}>{props.children}</Context.Provider>;
    //@@viewOff:render
  },
});

export default Provider;
