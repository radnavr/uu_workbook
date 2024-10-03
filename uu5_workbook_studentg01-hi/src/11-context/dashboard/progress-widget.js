//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import { Box, Button, Grid, Progress } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px" }),
  box: () => Config.Css.css({ padding: "16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ProgressWidget = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgressWidget",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    value: PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    value: 0,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { value } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ProgressWidget);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Box className={Css.box()} height={218}>
          <Grid>
            <Grid.Item colSpan={12} justifySelf={"center"} alignSelf={"center"} rowSpan={8}>
              <Progress text={value + ""} value={value} size={"xl"} type={"horizontal"} />
            </Grid.Item>
            <Grid.Item justifySelf={"center"} colSpan={12} alignSelf={"center"} rowSpan={4}>
              <Button onClick={() => {}} colorScheme={"negative"}>
                Reset
              </Button>
            </Grid.Item>
          </Grid>
        </Box>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ProgressWidget };
export default ProgressWidget;
//@@viewOff:exports
