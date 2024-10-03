//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RailwayMan from "../routes/railway-man";
import Dashboard from "../routes/dashboard";
//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../../routes/about.js"));

const ROUTE_MAP = {
  "": { redirect: "home" },
  dashboard: (props) => <Dashboard {...props} />,
  about: (props) => <About {...props} />,
  "railway-man": (props) => <RailwayMan {...props} />,
  "*": { redirect: "dashboard" },
};
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]}>
        <Plus4U5App.Spa routeMap={ROUTE_MAP} />
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports