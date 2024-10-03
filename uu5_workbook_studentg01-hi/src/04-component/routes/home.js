//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { ActionGroup } from "uu5g05-elements";

import Config from "./config/config.js";
import YellowBox from "../tga/yellow-box.js";
import GreenBox from "../tga/green-box.js";
import BlueDot from "../tga/blue-dot.js";
import Vehicle from "../railway/vehicle.js";
import Train from "../railway/train.js";

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

  render(props) {
    //@@viewOn:private
    //const getCountOfBlues = Math.floor(Math.random() * 16 + 1);

    const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min) + min);
    const isMailVehicle = Math.random() > 0.5;
    const generateTrain = () => {
      const numberOfCars = getRandomNumber(40, 10);
      const double = (numberOfCars - (numberOfCars % 3)) / 3;
      const single = numberOfCars - double * 2;

      const mailCar = isMailVehicle ? "mailWagon" : null;
      const diningCars = [...Array(double).keys()].map((_) => "diningWagon");
      const firstClassCars = [...Array(double).keys()].map((_) => "firstClassWagon");
      const secondClassCars = [...Array(single).keys()].map((_) => "secondClassWagon");

      return ["locomotive", mailCar, ...diningCars, ...firstClassCars, ...secondClassCars];
    };

    const [train, setTrain] = useState(generateTrain());
    const [location, setLocation] = useState("station");
    //@@viewOff:private

    //@@viewOn:interfaces
    const itemList = [
      {
        icon: "fa-refresh",
        children: "Regenerate train",
        onClick: () => setTrain(generateTrain()),
        disabled: location === "station" || location === "railway",
      },
      {
        icon: "fa-home",
        children: "Send to depot",
        onClick: () => setLocation("depot"),
        disabled: location === "depot",
      },
      {
        icon: "fa-check",
        children: "Send on the railway",
        onClick: () => setLocation("railway"),
      },
    ];
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <div style={{ margin: "16px" }}>
          <h3>Railway - Task 3</h3>
          <ActionGroup itemList={itemList} />
          <Train location={location} vehicles={train} />
        </div>

        <div style={{ margin: "16px" }}>
          <h3>Railway - Task 2</h3>
          <Train
            location={"depot"}
            vehicles={["mailWagon", "diningWagon", "locomotive", "firstClassWagon", "secondClassWagon"]}
          />
        </div>

        <div style={{ margin: "16px" }}>
          <h3>Railway - Task 1</h3>
          {[...Array(8).keys()].map((el) => (
            <Vehicle key={el} />
          ))}
        </div>
        {/*<div style={{ display: "flex", margin: "16px" }}>
          {[...Array(getCountOfBlues).keys()].map((el) => (
            <BlueDot key={el} />
          ))}
        </div>
        <GreenBox />
        <YellowBox />
        <GreenBox />*/}
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
