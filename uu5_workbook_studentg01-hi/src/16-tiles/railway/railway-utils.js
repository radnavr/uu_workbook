import { Utils } from "uu5g05";

const STATICS = {
  mailCarProbability: 0.3,
  secondClassCarProbability: 0.6,
  firstClassCarProbability: 0.35,
  diningCarProbability: 0.05,
  VEHICLE_TYPES: ["locomotive", "mailWagon", "diningWagon", "firstClassWagon", "secondClassWagon"],
};

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isMailCar() {
  return Math.random() < STATICS.mailCarProbability;
}

function getRandCarType() {
  let random = Math.random();
  let typeIndex = 4;

  if (random > STATICS.secondClassCarProbability + STATICS.firstClassCarProbability) {
    typeIndex = 2;
  } else if (random < STATICS.firstClassCarProbability) {
    typeIndex = 1;
  } else if (random < STATICS.secondClassCarProbability) {
    typeIndex = 3;
  }

  return STATICS.VEHICLE_TYPES[typeIndex];
}

function generateTrain(maxSize) {
  let result = [{ type: "locomotive", id: Utils.String.generateId() }];
  const vehicleCount = getRandomNumber(maxSize, 2) - 1;

  for (let i = 0; i < vehicleCount; i++) {
    result.push({ type: getRandCarType(), id: Utils.String.generateId() });
  }

  return result.sort((a, b) => {
    if (a.type === "locomotive") return -1;
    if (b.type === "locomotive") return 1;
    return a.type.localeCompare(b.type);
  });
}

export { getRandCarType, getRandomNumber, isMailCar, generateTrain };
