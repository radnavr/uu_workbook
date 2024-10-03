//@@viewOn:imports
import { createVisualComponent, useState, useEffect, useLsi, useScreenSize } from "uu5g05";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
import { Button } from "uu5g05-elements";
import AddTrainModal from "./add-train-modal.js";
import { Grid } from "uu5tilesg02-elements";
import TrainV12 from "./train-v12.js";
import TrainMonitor from "./train-monitor.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  container: () =>
    Config.Css.css({
      margin: "8px",
    }),

  createTrainBtn: () =>
    Config.Css.css({
      margin: "16px 0",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TrainView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainView",
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
    const lsi = useLsi(importLsi);
    const [screenSize] = useScreenSize();

    const [trains, setTrains] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      if (props.trains.data) {
        setTrains(props.trains.data);
      }
    }, [props.trains.data]);

    // Q: Does it work?
    const handleLoadNext = async ({ indexFrom }) => {
      await props.trains.handlerMap.loadNext({
        pageInfo: {
          pageIndex: Math.floor(indexFrom / props.trains.pageSize),
        },
      });
    };

    //@@viewOff:private

    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <div className={Css.container()}>
          <TrainMonitor />

          <Button
            colorScheme="primary"
            className={Css.createTrainBtn()}
            onClick={() => setIsModalOpen(true)}
            width={screenSize === "xs" || screenSize === "s" ? "100%" : 250}
          >
            {lsi.AddTrainButton.text}
          </Button>

          <Grid data={trains} onLoad={handleLoadNext}>
            <TrainV12 />
          </Grid>
        </div>
        <AddTrainModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onSubmit={props.trains.handlerMap.setData}
          currentData={trains}
        />
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainView };
export default TrainView;
//@@viewOff:exports
