"use strict";
const WorkbookStudentAbl = require("../../abl/workbook-student-abl.js");

class WorkbookStudentController {
  init(ucEnv) {
    return WorkbookStudentAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new WorkbookStudentController();
