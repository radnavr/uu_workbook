//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import Train from "./train";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Tile = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string,
        structure: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, ...otherProps } = props;

    return (
      <Uu5TilesElements.Tile {...otherProps} borderRadius="elementary">
        <Train trainId={data.data.id} trainStructure={data.data.structure} />
      </Uu5TilesElements.Tile>
    );
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
