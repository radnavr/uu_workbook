//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, useContext, useLsi, useScreenSize } from "uu5g05";
import { ActionGroup, Badge, Box } from "uu5g05-elements";
import Config from "./config/config.js";
import Vehicle from "./vehicle.js";
import TrainMonitorContext from "../trains/context.js";
import importLsi from "../../lsi/import-lsi.js";
import ConfirmationModal from "./confirmation-modal.js";
import generateTrain from "../trains/railway-utils.js";
import { getRandomNumber } from "../trains/railway-utils.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  train: (screenSize) =>
    Config.Css.css({
      display: "flex",
      flexWrap: "wrap",
      paddingTop: screenSize === "xs" || screenSize === "s" ? "18px" : "36px",
    }),

  trainBox: () =>
    Config.Css.css({
      padding: "4px",
    }),

  trainId: () =>
    Config.Css.css({
      margin: "3px",
      padding: "5px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TrainV12 = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainV12",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    location: PropTypes.oneOf(["depot", "station", "railway"]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    location: "depot",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [trainMonitor, setTrainMonitor] = useContext(TrainMonitorContext);

    const lsi = useLsi(importLsi);
    const [screenSize] = useScreenSize();

    const [train, setTrain] = useState(props.data.data);
    const [location, setLocation] = useState(props.location);
    const [destination, setDestination] = useState("N/A");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [destinationToConfirm, setDestinationToConfirm] = useState("");

    const handleLocationChange = (startingLocation, destination) => {
      setLocation("railway");
      setTrainMonitor((prev) => ({
        ...prev,
        ["railway"]: (prev["railway"] += 1),
        [startingLocation]: (prev[startingLocation] -= 1),
      }));
      setDestination(destination);
    };

    useEffect(() => {
      if (destination === "N/A") return;
      const travelTime = getRandomNumber(60, 20);
      setTimeout(() => {
        setLocation(destination);
        setTrainMonitor((prev) => ({
          ...prev,
          ["railway"]: (prev["railway"] -= 1),
          [destination]: (prev[destination] += 1),
        }));
        setDestination("N/A");
      }, travelTime * 1000);
    }, [location]);

    const itemList = [
      {
        component: (
          <div style={{ display: "flex", flexGrow: 1 }}>
            <Badge size="xl" colorScheme="primary" className={Css.trainId()}>
              {train.id}
            </Badge>
          </div>
        ),
      },
      {
        icon: "fa-map-pin",
        children: `${lsi.ActionGroup.location}: ${lsi.Location[location]}`,
      },
      { icon: "fa-location-arrow", children: `${lsi.ActionGroup.movingTo}: ${lsi.Location[destination]}` },
      {
        icon: "fa-refresh",
        children: lsi.ActionGroup.regenarateTrain,
        onClick: () => setTrain((prev) => ({ ...prev, structure: generateTrain(prev.maxSize) })),
        disabled: location === "station" || location === "railway",
        collapsed: screenSize === "xs" || screenSize === "s",
      },
      {
        icon: "fa-wrench",
        children: lsi.ActionGroup.sendToDepot,
        onClick: () => {
          setIsModalOpen(true);
          setDestinationToConfirm("depot");
        },
        disabled: location === "depot",
        collapsed: screenSize === "xs" || screenSize === "s",
      },
      {
        icon: "fa-building",
        children: lsi.ActionGroup.sendToStation,
        onClick: () => {
          setIsModalOpen(true);
          setDestinationToConfirm("station");
        },
        collapsed: screenSize === "xs" || screenSize === "s",
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Box className={Css.trainBox()}>
        <ConfirmationModal
          header={train.id}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleLocationChange(location, destinationToConfirm)}
        />
        <ActionGroup itemList={itemList} size={screenSize === "xs" || screenSize === "s" ? "s" : "m"} />
        <div className={Css.train(screenSize)}>
          {train.structure.map((vehicle) => (
            <Vehicle key={vehicle.id} type={vehicle.type} />
          ))}
        </div>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainV12 };
export default TrainV12;
//@@viewOff:exports
