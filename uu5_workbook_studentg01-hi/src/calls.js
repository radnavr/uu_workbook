import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// the base URI of calls for development / staging environments can be configured in *-hi/env/development.json
// (or <stagingEnv>.json), e.g.:
//   "uu5Environment": {
//     "callsBaseUri": "http://localhost:8080/vnd-app/awid"
//   }
const CALLS_BASE_URI = (
  (process.env.NODE_ENV !== "production" ? Environment.get("callsBaseUri") : null) || Environment.appBaseUri
).replace(/\/*$/, "/");

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri, {});
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri, {});
  },

  listOnlinePeople(dtoIn) {
    const commandUri = Calls.getCommandUri("people/listOnline");
    return Calls.call("get", commandUri, dtoIn);
  },

  listTrains(dtoIn) {
    const commandUri = Calls.getCommandUri("train/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  getAccount(dtoIn) {
    const commandUri = Calls.getCommandUri("account/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  getProduct(dtoIn) {
    const commandUri = Calls.getCommandUri("product/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  getNews(dtoIn) {
    const commandUri = Calls.getCommandUri("newsArticle/listPublished");
    return Calls.call("get", commandUri, dtoIn);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase) {
    return CALLS_BASE_URI + useCase.replace(/^\/+/, "");
  },
};

export default Calls;
