const trainData = [
  {
    id: "train1",
    structure: [
      { id: "LOCO", type: "locomotive" },
      { id: "MAIL1", type: "mailWagon" },
      { id: "SC2", type: "secondClassWagon" },
    ],
    maxSize: 10,
  },
  {
    id: "train2",
    structure: [
      { id: "LOCO", type: "locomotive" },
      { id: "MAIL1", type: "diningWagon" },
      { id: "SC2", type: "firstClassWagon" },
    ],
    maxSize: 10,
  },
  {
    id: "train3",
    structure: [
      { id: "LOCO", type: "locomotive" },
      { id: "MAIL1", type: "mailWagon" },
      { id: "FC1", type: "firstClassWagon" },
      { id: "FC2", type: "firstClassWagon" },
      { id: "SC1", type: "secondClassWagon" },
      { id: "SC2", type: "secondClassWagon" },
      { id: "SC3", type: "secondClassWagon" },
    ],
    maxSize: 10,
  },
  {
    id: "train4",
    structure: [
      { id: "LOCO", type: "locomotive" },
      { id: "MAIL1", type: "mailWagon" },
      { id: "FC1", type: "firstClassWagon" },
      { id: "SC2", type: "secondClassWagon" },
      { id: "SC3", type: "secondClassWagon" },
    ],
    maxSize: 10,
  },
];

const listTrains = async () => {
  return Promise.resolve({
    itemList: trainData,
    pageInfo: { pageSize: trainData.length, pageIndex: 0, total: trainData.length },
    uuAppErrorMap: {},
  });
};

export default listTrains;
