//@@viewOn:imports
import { createVisualComponent, useState, useLsi } from "uu5g05";
import Config from "./config/config.js";
import { Modal, Button } from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";
import { Form, FormText } from "uu5g05-forms";
import generateTrain from "../trains/railway-utils.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  paragraph: () =>
    Config.Css.css({
      color: "red",
      textAlign: "center",
      paddingBottom: "24px",
    }),

  buttonContainer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-evenly",
    }),

  input: () =>
    Config.Css.css({
      paddingBottom: "24px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const AddTrainModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddTrainModal",
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

    const initialFormState = {
      trainCode: "",
      trainLength: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const { trainCode, trainLength } = formData;

    const [isCodeError, setIsCodeError] = useState(false);

    const handleFormDataChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const isTrainCodeDuplicit = () => props.currentData.some((train) => train.data.id === trainCode);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (isTrainCodeDuplicit()) {
        setIsCodeError(true);
        return;
      }

      const data = {
        id: trainCode,
        structure: generateTrain(Number(trainLength)),
        maxSize: Number(trainLength),
      };
      
      const newData = [{ data }, ...props.currentData];
      setFormData(initialFormState);
      isCodeError && setIsCodeError(false);
      props.onSubmit(newData);
      props.handleClose();
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Modal header={lsi.AddTrainModal.header} open={props.open} width={350}>
        <div>
          <Form>
            <FormText
              label={lsi.AddTrainModal.trainCode}
              name="trainCode"
              maxLength={255}
              onChange={handleFormDataChange}
              size="m"
              value={trainCode}
              required
              className={Css.input()}
            />
            <FormText
              label={lsi.AddTrainModal.maximumPublicCars}
              name="trainLength"
              maxLength={2}
              onChange={handleFormDataChange}
              type="number"
              value={trainLength}
              required
              className={Css.input()}
            />
            {isCodeError && <p className={Css.paragraph()}>{lsi.AddTrainModal.codeError}</p>}
          </Form>
          <div className={Css.buttonContainer()}>
            <Button
              colorScheme="red"
              onClick={() => {
                props.handleClose();
                setIsCodeError(false);
              }}
            >
              {lsi.AddTrainModal.cancel}
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              {lsi.AddTrainModal.confirm}
            </Button>
          </div>
        </div>
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddTrainModal };
export default AddTrainModal;
//@@viewOff:exports
