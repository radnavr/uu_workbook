//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import { Progress, Button, Grid } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ width: "150px", margin: "8px 16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const VotingComponent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "VotingComponent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    VotingComponent.logger.setLevel(1);

    const [likes, setLikes] = useState(3);
    const [dislikes, setDislikes] = useState(2);

    function handleVoteUp() {
      setLikes((prev) => ++prev);
    }
    function handleVoteDown() {
      setDislikes((prev) => ++prev);
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Grid
          templateAreas={`voteUp progress voteDown`}
          justifyItems={"center"}
          alignItems={"center"}
          alignContent={"left"}
          flow={"row"}
        >
          <Button
            colorScheme={"negative"}
            icon={"uugdsstencil-communication-thumb-down"}
            onClick={() => handleVoteDown()}
            name={"voteDown"}
          />
          <Progress
            value={likes - dislikes}
            size={"l"}
            type="horizontal"
            text={`-${dislikes}/+${likes}`}
            colorScheme={likes > dislikes ? "positive" : "negative"}
            name={"progress"}
          />
          <Button
            colorScheme={"positive"}
            icon={"uugdsstencil-communication-thumb-up"}
            onClick={() => handleVoteUp()}
            name={"voteUp"}
          />
        </Grid>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { VotingComponent };
export default VotingComponent;
//@@viewOff:exports
