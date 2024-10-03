//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useLsi } from "uu5g05";
import { Button, Grid, Modal, UuGds } from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import { generateTrain } from "./railway-utils";
import importLsi from "../lsi/import-lsi";
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

const AddTrainButton = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddTrainButton",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    trains: PropTypes.arrayOf(PropTypes.object),
    handlerMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    trains: [],
    handlerMap: { setData: () => {} },
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { trains, handlerMap } = props;
    const [open, setOpen] = useState(false);
    const lsi = useLsi(importLsi, [AddTrainButton.uu5Tag]);

    function handleSubmit(e) {
      const { code, maxSize } = e.data.value;

      const newTrain = { id: code, maxSize };
      newTrain.structure = generateTrain(maxSize);

      let newTrainList = trains.map((t) => t.data);
      newTrainList.push(newTrain);

      handlerMap.setData({
        itemList: newTrainList,
        pageInfo: { pageSize: ++trains.length, pageIndex: 0 },
      });
    }

    function handleCodeValidation(e) {
      if (e.data.value !== undefined && trains.some((t) => t.data.id === e.data.value)) {
        return { code: "codeNotUnique", feedback: "error", message: lsi.codeNotUnique };
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Button onClick={() => setOpen(true)}>{lsi.addNewTrain}</Button>
        <Uu5Forms.Form.Provider onSubmit={handleSubmit} onSubmitted={() => setOpen(false)}>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            header={lsi.addNewTrain}
            footer={
              <Grid
                templateColumns={{ xs: "1fr", s: "auto" }}
                columnGap={UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.SubmitButton>{lsi.add}</Uu5Forms.SubmitButton>
              </Grid>
            }
          >
            <Uu5Forms.Form.View gridLayout={`code maxSize`}>
              <Uu5Forms.FormText
                name="code"
                label="Code"
                placeholder="Add unique code"
                required
                onValidate={handleCodeValidation}
              />
              <Uu5Forms.FormNumber name="maxSize" label="Size" required min={1} max={40} initialValue={10} />
            </Uu5Forms.Form.View>
          </Modal>
        </Uu5Forms.Form.Provider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddTrainButton };
export default AddTrainButton;
//@@viewOff:exports
