import Uu5WorkbookStudent from "uu5_workbook_studentg01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`Uu5WorkbookStudent.04Component.Tga.BlueDot`, () => {
  testProperties(Uu5WorkbookStudent.04Component.Tga.BlueDot, CONFIG);
});
