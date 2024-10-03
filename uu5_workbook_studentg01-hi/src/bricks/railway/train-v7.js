//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useEffect, useContext, useLsi } from "uu5g05";
import { ActionGroup } from "uu5g05-elements";
import Config from "./config/config.js";
import Vehicle from "./vehicle.js";
import TrainMonitorContext from "../trains/context.js";
import importLsi from "../../lsi/import-lsi.js";
import ConfirmationModal from "./confirmation-modal.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      borderBottom: "2px dashed grey",
      marginBottom: "48px",
      paddingBottom: "16px",
    }),

  train: () =>
    Config.Css.css({
      display: "flex",
      flexWrap: "wrap",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TrainV7 = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TrainV7",
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
    const lsi = useLsi(importLsi);

    const trainData = props.trainStructure.data;

    const [trainMonitor, setTrainMonitor] = useContext(TrainMonitorContext);

    const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min) + min);
    const isMailVehicle = Math.random() > 0.5;

    const generateTrain = () => {
      const numberOfCars = getRandomNumber(trainData.maxSize, 3);
      const double = (numberOfCars - (numberOfCars % 3)) / 3;
      const single = numberOfCars - double * 2;

      const trainHead = isMailVehicle ? ["locomotive", "mailWagon"] : ["locomotive"];
      const diningCars = [...Array(double).keys()].map((_) => "diningWagon");
      const firstClassCars = [...Array(double).keys()].map((_) => "firstClassWagon");
      const secondClassCars = [...Array(single).keys()].map((_) => "secondClassWagon");

      const newTrainComposition = [...trainHead, ...diningCars, ...firstClassCars, ...secondClassCars];
      const newTrainData = newTrainComposition.map((car, ind) => ({ id: ind, type: car }));

      return newTrainData;
    };

    const [train, setTrain] = useState(trainData.structure);
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
      }, travelTime * 100);
    }, [location]);

    const itemList = [
      {
        icon: "fa-map-pin",
        children: `${lsi.ActionGroup.location}: ${lsi.Location[location]}`,
      },
      { icon: "fa-train", children: `${lsi.ActionGroup.movingTo}: ${lsi.Location[destination]}` },
      {
        icon: "fa-refresh",
        children: lsi.ActionGroup.regenarateTrain,
        onClick: () => setTrain(generateTrain()),
        disabled: location === "station" || location === "railway",
      },
      {
        icon: "fa-wrench",
        children: lsi.ActionGroup.sendToDepot,
        onClick: () => {
          setIsModalOpen(true);
          handleLocationChange(location, "depot");
        },
        disabled: location === "depot",
      },
      {
        icon: "fa-building",
        children: lsi.ActionGroup.sendToStation,
        onClick: () => {
          setIsModalOpen(true);
          handleLocationChange(location, "station");
        },
      },
    ];

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className={Css.main()}>
        <ConfirmationModal
          header={props.trainStructure.data.id}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleLocationChange(location, destinationToConfirm)}
        />
        <ActionGroup itemList={itemList} />
        <div className={Css.train()}>
          {train.map((vehicle) => (
            <Vehicle key={vehicle.id} type={vehicle.type} />
          ))}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TrainV7 };
export default TrainV7;
//@@viewOff:exports
