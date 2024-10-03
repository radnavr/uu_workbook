//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";

import style from "./home.module.css";
import Tile from "../../bricks/a03/tile.js";
import Datum from "../../bricks/a03/date.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
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
      <div className={style.pageContentContainer}>
        <div className={style.cubeContainer}>
          <div className={style.row}>
            <Tile background="red" />
            <Tile background="blue" />
            <Tile background="red" />
          </div>
          <div className={style.row}>
            <Tile background="white" />
            <Tile background="yellow" />
            <Tile background="blue" />
          </div>
          <div className={style.row}>
            <Tile background="green" />
            <Tile background="white" />
            <Tile background="red" />
          </div>
        </div>
        <Datum />
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
