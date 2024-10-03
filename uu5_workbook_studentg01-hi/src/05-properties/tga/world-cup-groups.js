//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import FlagList from "./flag-list.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const WorldCupGroups = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WorldCupGroups",
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
    const { children } = props;
    const getGroups = (arr, size) => {
      const arrs = arr.reduce((acc, _, index) => {
        if (index % size === 0) {
          acc.push(arr.slice(index, index + size));
        }
        return acc;
      }, []);

      const groupsArr = arrs.map((arr, ind) => {
        return { name: String.fromCharCode(65 + ind), countries: arr };
      });
      return groupsArr;
    };

    const groups = getGroups(props.countries, 4);
    //@@viewOff:private

    //@@viewOn:interface
    const Group = ({ name, countries }) => {
      return (
        <div>
          <h1>{name}</h1>
          <FlagList countryList={countries} />
        </div>
      );
    };
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, WorldCupGroups);

    return (
      <>
        {groups.map((group) => (
          <Group key={group.name} name={group.name} countries={group.countries} />
        ))}
      </>
    );

    /*currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {WorldCupGroups.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;*/
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { WorldCupGroups };
export default WorldCupGroups;
//@@viewOff:exports
