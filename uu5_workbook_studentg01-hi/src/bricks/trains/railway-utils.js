export const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min) + min);
//const isMailVehicle = Math.random() > 0.5;

const generateTrain = (maxPublicCars) => {
  const numberOfCars = getRandomNumber(maxPublicCars, 3);
  const double = (numberOfCars - (numberOfCars % 3)) / 3;
  const single = numberOfCars - double * 2;

  const trainHead = Math.random() > 0.5 ? ["locomotive", "mailWagon"] : ["locomotive"];
  const diningCars = [...Array(double).keys()].map((_) => "diningWagon");
  const firstClassCars = [...Array(double).keys()].map((_) => "firstClassWagon");
  const secondClassCars = [...Array(single).keys()].map((_) => "secondClassWagon");

  const newTrainComposition = [...trainHead, ...diningCars, ...firstClassCars, ...secondClassCars];
  const newTrainData = newTrainComposition.map((car, ind) => ({ id: ind, type: car }));

  return newTrainData;
};

export default generateTrain;
