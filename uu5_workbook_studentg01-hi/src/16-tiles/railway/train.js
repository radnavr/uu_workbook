//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useState, useUpdateEffect, useEffect, useLsi, useRef } from "uu5g05";
import { ActionGroup, Badge, Dialog, Text } from "uu5g05-elements";
import Config from "./config/config.js";
import { getRandomNumber } from "./railway-utils";
import Vehicle from "./vehicle";
import { useRailwayContext } from "./railway-context";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
const LOCATIONS = ["depot", "station", "railway"];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ padding: "16px" }),
  train: () =>
    Config.Css.css({
      display: "flex",
      flexWrap: "wrap",
    }),
};
//@@viewOff:css

//@@viewOn:helpers

function resolveMovingTo(currentLocation, nextLocation) {
  if (currentLocation === "depot") return "N/A";
  if (currentLocation === "station") return "N/A";

  return nextLocation === "depot" ? "depot" : "station";
}

function getActions(currentLocation, nextLocation, isInDepot, isInStation, setLocation, maxSize, lsi) {
  return [
    {
      children: (
        <Text>
          {`${lsi.currentLocation}: `}
          <Badge size={"xl"} colorScheme={"positive"}>
            {lsi[currentLocation]}
          </Badge>
        </Text>
      ),
      significance: "subdued",
    },
    {
      children: (
        <Text>
          {`${lsi.movingTo}: `}
          <Badge size={"xl"} colorScheme={"positive"}>
            {lsi[resolveMovingTo(currentLocation, nextLocation)] || "N/A"}
          </Badge>
        </Text>
      ),
      significance: "subdued",
    },
    {
      divider: true,
    },
    {
      children: lsi.sendToDepot,
      icon: "uugds-home",
      onClick: () => setLocation("depot"),
      disabled: isInDepot,
    },
    {
      children: lsi.sendOnTheRailway,
      icon: "uugdsstencil-navigation-portal",
      onClick: () => setLocation("railway"),
      disabled: !isInDepot && !isInStation,
    },
  ];
}

//@@viewOff:helpers

const Train = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Train",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    location: PropTypes.oneOf(LOCATIONS).isRequired,
    maxSize: PropTypes.number,
    trainStructure: PropTypes.arrayOf(PropTypes.object),
    trainId: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    maxSize: 20,
    location: "depot",
    trainStructure: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { location, maxSize, trainId, trainStructure } = props;
    const [currentLocation, setCurrentLocation] = useState(location);
    const [open, setOpen] = useState(false);
    const [nextLocation, setNextLocation] = useState(location);
    const { setTrainToLocation } = useRailwayContext();
    const lsi = useLsi(importLsi, [Train.uu5Tag]);
    const locationLsi = useLsi(importLsi, ["Uu5Workbook.Railway"]);
    const unconfirmedLocation = useRef();

    const isInDepot = currentLocation === "depot";
    const isInStation = currentLocation === "station";

    useUpdateEffect(() => {
      setCurrentLocation("railway");
      const timeout = getRandomNumber(40, 10);
      const tid = setTimeout(() => setCurrentLocation(nextLocation === "depot" ? "depot" : "station"), timeout * 1000);

      return () => clearTimeout(tid);
    }, [nextLocation]);

    useEffect(() => {
      setTrainToLocation(currentLocation, trainId);
    }, [currentLocation, trainId]);

    function sendTrain(location) {
      unconfirmedLocation.current = location;
      setOpen(true);
    }

    function allow() {
      setNextLocation(unconfirmedLocation.current);
      setOpen(false);
    }

    function refuse() {
      setOpen(false);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <ActionGroup
          itemList={getActions(currentLocation, nextLocation, isInDepot, isInStation, sendTrain, maxSize, {
            ...lsi,
            ...locationLsi,
          })}
        />
        <div className={Css.train()}>
          {trainStructure.map((vehicle) => (
            <Vehicle key={vehicle.id} type={vehicle.type} />
          ))}
        </div>
        <Dialog
          open={open}
          header={lsi.confirmSend}
          icon="uugds-portal"
          actionDirection="horizontal"
          actionList={[
            { children: lsi.confirmNo, onClick: () => refuse(), colorScheme: "negative" },
            { children: lsi.confirmYes, onClick: () => allow(), colorScheme: "positive", significance: "highlighted" },
          ]}
          onClose={() => refuse()}
        ></Dialog>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Train };
export default Train;
//@@viewOff:exports
