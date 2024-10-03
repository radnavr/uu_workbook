//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import { Modal, Button } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  buttonContainer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-evenly",
    }),

  paragraph: () =>
    Config.Css.css({
      paddingBottom: "24px",
      textAlign: "center",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ConfirmationModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ConfirmationModal",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Modal header={`${lsi.ConfirmationModal.header} ${props.header}`} width={350} open={props.open}>
        <p className={Css.paragraph()}>{lsi.ConfirmationModal.text}</p>
        <div className={Css.buttonContainer()}>
          <Button colorScheme="red" onClick={props.onClose}>
            {lsi.ConfirmationModal.cancel}
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
          >
            {lsi.ConfirmationModal.confirm}
          </Button>
        </div>
      </Modal>
    );
  },
});

//@@viewOn:exports
export { ConfirmationModal };
export default ConfirmationModal;
//@@viewOff:exports
