//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useEffect } from "uu5g05";
import { ActionGroup } from "uu5g05-elements";

import Config from "./config/config.js";
import Vehicle from "./vehicle.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      paddingBottom: "64px",
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

const Train = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Train",
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
    const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min) + min);
    const isMailVehicle = Math.random() > 0.5;

    const generateTrain = () => {
      const numberOfCars = getRandomNumber(40, 10);
      const double = (numberOfCars - (numberOfCars % 3)) / 3;
      const single = numberOfCars - double * 2;

      const trainHead = isMailVehicle ? ["locomotive", "mailWagon"] : ["locomotive"];
      const diningCars = [...Array(double).keys()].map((_) => "diningWagon");
      const firstClassCars = [...Array(double).keys()].map((_) => "firstClassWagon");
      const secondClassCars = [...Array(single).keys()].map((_) => "secondClassWagon");

      return [...trainHead, ...diningCars, ...firstClassCars, ...secondClassCars];
    };

    const [train, setTrain] = useState(generateTrain());
    const [location, setLocation] = useState(props.location);
    const [destination, setDestination] = useState("stationary");

    const handleLocationChange = (destination) => {
      setLocation("railway");
      setDestination(destination);
    };

    useEffect(() => {
      if (destination === "stationary") return;
      const travelTime = getRandomNumber(60, 20);
      setTimeout(() => {
        setLocation(destination);
        setDestination("stationary");
      }, travelTime * 1000);
    }, [location]);

    const itemList = [
      {
        icon: "fa-map-pin",
        children: `Location: ${location}`,
      },
      { icon: "fa-train", children: `Moving to: ${destination}` },
      {
        icon: "fa-refresh",
        children: "Regenerate train",
        onClick: () => setTrain(generateTrain()),
        disabled: location === "station" || location === "railway",
      },
      {
        icon: "fa-wrench",
        children: "Send to depot",
        onClick: () => handleLocationChange("depot"),
        disabled: location === "depot",
      },
      {
        icon: "fa-building",
        children: "Send to station",
        onClick: () => handleLocationChange("station"),
      },
    ];

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className={Css.main()}>
        <ActionGroup itemList={itemList} />
        <div className={Css.train()}>
          {train.map((vehicle, ind) => (
            <Vehicle key={ind} type={vehicle} />
          ))}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Train };
export default Train;
//@@viewOff:exports
