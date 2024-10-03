//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Button, Grid, Number, PlaceholderBox } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px" }),
  box: () => Config.Css.css({ padding: "16px", fontSize: "300%", textAlign: "right", fontWeight: "bold" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const NumberWidget = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "NumberWidget",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    authoritiesOnly: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    authoritiesOnly: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { authoritiesOnly } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Grid>
          <Box className={Css.box()} colorScheme={"positive"} significance={"distinct"}>
            <Number value={1865464}></Number>
          </Box>
          <Button significance={"distinct"} onClick={() => {}}>
            Export balance details
          </Button>
        </Grid>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { NumberWidget };
export default NumberWidget;
//@@viewOff:exports
