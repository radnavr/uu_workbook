const peopleData = [
  {
    id: "65606d17513fa8b870e595e4",
    isActive: true,
    age: 26,
    eyeColor: "green",
    name: "Raquel Mcleod",
    gender: "female",
    company: "QUONATA",
    registered: "2014-05-06T01:18:52 -02:00",
  },
  {
    id: "65606d175483ab4754b272c6",
    isActive: true,
    age: 18,
    eyeColor: "green",
    name: "Tara Schneider",
    gender: "female",
    company: "YOGASM",
    registered: "2017-08-10T02:47:30 -02:00",
  },
  {
    id: "65606d173135f267087532fa",
    isActive: true,
    age: 44,
    eyeColor: "brown",
    name: "Deidre Bond",
    gender: "female",
    company: "TYPHONICA",
    registered: "2016-05-05T11:35:53 -02:00",
  },
  {
    id: "65606d17959a58dc25f6a0a2",
    isActive: true,
    age: 27,
    eyeColor: "green",
    name: "Delgado Yates",
    gender: "male",
    company: "ECLIPSENT",
    registered: "2020-11-27T06:46:17 -01:00",
  },
  {
    id: "65606d17ac66a19d1349ebfe",
    isActive: true,
    age: 45,
    eyeColor: "brown",
    name: "Savage Larson",
    gender: "male",
    company: "ZERBINA",
    registered: "2019-06-16T02:11:52 -02:00",
  },
  {
    id: "65606d17c014ae5cdb4b3381",
    isActive: false,
    age: 56,
    eyeColor: "green",
    name: "Lindsey Mcintosh",
    gender: "male",
    company: "PEARLESEX",
    registered: "2023-09-01T10:58:22 -02:00",
  },
  {
    id: "65606d17f8a5b500b10772e2",
    isActive: false,
    age: 56,
    eyeColor: "brown",
    name: "Audra Gilmore",
    gender: "female",
    company: "JAMNATION",
    registered: "2022-09-27T06:24:25 -02:00",
  },
  {
    id: "65606d175076ddf087bf6826",
    isActive: false,
    age: 40,
    eyeColor: "blue",
    name: "Becky Wall",
    gender: "female",
    company: "DUOFLEX",
    registered: "2020-11-11T04:45:16 -01:00",
  },
  {
    id: "65606d17d508c1a6f86dbdde",
    isActive: true,
    age: 29,
    eyeColor: "green",
    name: "Dona Martinez",
    gender: "female",
    company: "GEOSTELE",
    registered: "2020-09-17T03:56:22 -02:00",
  },
  {
    id: "65606d17b7c780304e5d8bdd",
    isActive: true,
    age: 31,
    eyeColor: "blue",
    name: "Woodward Brewer",
    gender: "male",
    company: "COWTOWN",
    registered: "2021-12-19T03:18:14 -01:00",
  },
  {
    id: "65606d17c4ef74003109ce25",
    isActive: true,
    age: 20,
    eyeColor: "brown",
    name: "Taylor Armstrong",
    gender: "female",
    company: "VIRVA",
    registered: "2018-03-18T11:02:32 -01:00",
  },
  {
    id: "65606d171a425e615249d38e",
    isActive: true,
    age: 18,
    eyeColor: "blue",
    name: "Carr Ramirez",
    gender: "male",
    company: "XELEGYL",
    registered: "2022-08-08T05:52:45 -02:00",
  },
  {
    id: "65606d17a8446665ef3c988e",
    isActive: true,
    age: 49,
    eyeColor: "brown",
    name: "Jacobs Wood",
    gender: "male",
    company: "BLUPLANET",
    registered: "2023-10-20T02:04:55 -02:00",
  },
  {
    id: "65606d17b5e3ad0b8ebb9670",
    isActive: false,
    age: 54,
    eyeColor: "brown",
    name: "Constance Keith",
    gender: "female",
    company: "ORGANICA",
    registered: "2015-01-29T01:52:24 -01:00",
  },
  {
    id: "65606d179138def9bd1f1121",
    isActive: true,
    age: 42,
    eyeColor: "green",
    name: "Holloway Yang",
    gender: "male",
    company: "NIXELT",
    registered: "2022-05-26T01:25:42 -02:00",
  },
  {
    id: "65606d17a863ebafa522eb1c",
    isActive: true,
    age: 54,
    eyeColor: "green",
    name: "Roman Zamora",
    gender: "male",
    company: "ACUSAGE",
    registered: "2014-09-11T06:06:36 -02:00",
  },
  {
    id: "65606d179702c0eabbfabe19",
    isActive: true,
    age: 18,
    eyeColor: "green",
    name: "Stark Skinner",
    gender: "male",
    company: "SHOPABOUT",
    registered: "2022-10-24T10:08:34 -02:00",
  },
];

const errors = {
  "workbook/api/people/list/invalidDtoIn": {
    id: "9ace1a0731764cb1a0201a2baff6f142",
    timestamp: "2023-04-28T05:28:35.198Z",
    type: "error",
    message: "DtoIn is not valid.",
    paramMap: {
      invalidTypeKeyMap: {},
      invalidValueKeyMap: {
        $: {
          "shape.E002": "The content of shape must be valid.",
        },
      },
      missingKeyMap: {
        "$.pageInfo": {
          "isRequired.e001": "The value is required but missing.",
        },
      },
    },
  },
};

const listPeople = async (dtoIn) => {
  if (!dtoIn.pageInfo) {
    return Promise.reject({
      uuAppErrorMap: { ["workbook/api/people/list/invalidDtoIn"]: errors["workbook/api/people/list/invalidDtoIn"] },
    });
  }

  const dataLength = Math.floor(Math.random() * (peopleData.length - 4) + 3);
  const data = peopleData.slice(0, dataLength);

  return Promise.resolve({
    itemList: data,
    pageInfo: { pageSize: dataLength, pageIndex: 0, total: dataLength },
    uuAppErrorMap: {},
  });
};

export default listPeople;
