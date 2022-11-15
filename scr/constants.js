const AVATAR_NOSHADOW = {
  image1: require("../assets/icon.png"),
  image2: require("../assets/icon.png"),
  image3: require("../assets/icon.png"),
  image4: require("../assets/icon.png"),
};

const AVATAR_SHADOW = {
  image1: require("../assets/icon.png"),
  image2: require("../assets/icon.png"),
  image3: require("../assets/icon.png"),
  image4: require("../assets/icon.png"),
};

const AVATAR_ABOVE = {
  image1: require("../assets/icon.png"),
  image2: require("../assets/icon.png"),
  image3: require("../assets/icon.png"),
  image4: require("../assets/icon.png"),
};

export const contestants = [
  {
    image: AVATAR_NOSHADOW.image1,
    imageAbove: AVATAR_ABOVE.image1,
  },
  {
    image: AVATAR_NOSHADOW.image2,
    imageAbove: AVATAR_ABOVE.image2,
  },
  {
    image: AVATAR_NOSHADOW.image3,
    imageAbove: AVATAR_ABOVE.image3,
  },
  {
    image: AVATAR_NOSHADOW.image4,
    imageAbove: AVATAR_ABOVE.image4,
  },
];

export const avatars = [
  {
    image: AVATAR_NOSHADOW.image1,
    imageShadow: AVATAR_SHADOW.image1,
    imageAbove: AVATAR_ABOVE.image1,
    title: "Skillzy Hamster",
    index: 0,
  },
  {
    image: AVATAR_NOSHADOW.image2,
    imageShadow: AVATAR_SHADOW.image2,
    imageAbove: AVATAR_ABOVE.image2,
    title: "Mr. Pink",
    index: 1,
  },
  {
    image: AVATAR_NOSHADOW.image3,
    imageShadow: AVATAR_SHADOW.image3,
    imageAbove: AVATAR_ABOVE.image3,
    title: "Guinea",
    index: 2,
  },
  {
    image: AVATAR_NOSHADOW.image4,
    imageShadow: AVATAR_SHADOW.image4,
    imageAbove: AVATAR_ABOVE.image4,
    title: "Bear",
    index: 3,
  },
];

export const questionDelay = 1;
export const API_BASE_URL = "http://localhost:7373/api/";
export const podium = require("../assets/icon.png");
export const cWhite = "#fefefa";
export const cOrange = "#f4a261";
export const cGreen = "#2A9D8F";
export const barGreen = "#70e000";
export const cRed = "#E76F51";
export const cGold = "#ffd500";
export const cDark = "#264653";
export const cBlue = "#38677A";

//export const REACT_APP_API= "http://192.168.250.14:3000/api";
//export const REACT_APP_SOCKET = "http://192.168.250.14:3000";
export const REACT_APP_API = "https://skillzy-node.fly.dev/api";
export const REACT_APP_SOCKET = "https://skillzy-node.fly.dev";
//export const REACT_APP_API= "http://localhost:3000/api";
//export const REACT_APP_SOCKET = "http://localhost:3000";
