//@@viewOn:imports
import { createVisualComponent, Utils, useDataObject } from "uu5g05";
import { InfoGroup, Pending } from "uu5g05-elements";
import Calls from "calls";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const BankAccountDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BankAccountDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { state, data } = useDataObject({
      handlerMap: {
        load: Calls.getAccount,
      },
    });

    function getItemList() {
      return [
        { subtitle: "Owner", title: data.ownerName },
        { subtitle: "Contact Phone", title: data.ownerPhone },
        { subtitle: "Acc number", title: data.accountNumber },
        { subtitle: "Balance", title: data.balance },
      ];
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    if (state && state.search("pending") > -1) {
      return <Pending />;
    }

    return <div {...attrs}>{data && <InfoGroup itemList={getItemList()}></InfoGroup>}</div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BankAccountDetail };
export default BankAccountDetail;
//@@viewOff:exports
