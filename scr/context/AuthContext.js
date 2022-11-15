import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import axios from "axios";
import * as K from "../constants";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      // always return a new state, you can't change the state
      // this returns the original state, where the errorMessage is overwritten
      // this will change the state in the whole application
      return { ...state, errorMessage: action.payload };
    case "set_avatar":
      return { ...state, avatar: action.payload, errorMessage: "" };
    case "set_username":
      return { ...state, userName: action.payload, errorMessage: "" };
    case "commit_info":
      return {
        ...state,
        avatar: action.payload.avatar,
        userName: action.payload.username,
        totalCoins: action.payload.totalCoins,
        topScore: action.payload.topScore,
        score: action.payload.score,
        coins: action.payload.coins,
        XP: action.payload.XP,
        fastestTime: action.payload.fastestTime,
      };
    case "update_info":
      return {
        ...state,
        totalCoins: action.payload.totalCoins,
        topScore: action.payload.topScore,
        score: action.payload.score,
        coins: action.payload.coins,
        XP: action.payload.XP,
        fastestTime: action.payload.fastestTime,
      };
    default:
      return state;
  }
};

const chooseAvatar = (dispatch) => {
  return async ({ avatar }) => {
    try {
      await AsyncStorage.setItem("avatar", avatar);
      dispatch({ type: "set_avatar", payload: avatar });
    } catch (err) {
      // when calling dispatch it will automatically call authReducer
      dispatch({
        type: "add_error",
        payload: "Choose an avatar before continuing",
      });
    }
  };
};

const chooseUserName = (dispatch) => {
  return async ({ userName }) => {
    try {
      await AsyncStorage.setItem("username", userName);
      dispatch({ type: "set_username", payload: userName });
    } catch (err) {
      // when calling dispatch it will automatically call authReducer
      dispatch({
        type: "add_error",
        payload: "Choose an username before continuing",
      });
    }
  };
};

const submitInfo = (dispatch) => {
  return async ({ userName, avatar, classLevel }) => {
    if (avatar == "") {
      console.log("Something went wrong in submit info");
      dispatch({
        type: "add_error",
        payload: "Choose an avatar before continuing",
      });
    } else if (userName == "") {
      console.log("Something went wrong in submit info");
      dispatch({
        type: "add_error",
        payload: "Choose an username before continuing",
      });
    } else if (classLevel == null) {
      console.log("Something went wrong in submit info");
      dispatch({
        type: "add_error",
        payload: "Choose your class before continuing",
      });
    } else {
      let user = {
        username: userName,
        avatar: avatar,
        classLevel: classLevel,
        totalCoins: 0,
        XP: 0,
        coins: 0,
        score: 0,
        topScore: 0,
      };
      await AsyncStorage.setItem("user", JSON.stringify(user));

      // Post user info to server
      //   console.log("About to post user on server");
      //   console.log("URL: ", K.REACT_APP_API);
      //   const data = await axios.post(`${K.REACT_APP_API}/signup`, {
      //     name: "test1",
      //     email: "test1@test.com",
      //     password: "password",
      //   });

      //   if (data.error) {
      //     console.log("Error in connecting to server:", data.error);
      //     return;
      //   } else {
      //     console.log("registration success", data);
      //     navigate("Loading", { reason: "quiz" });
      //   }
    }
  };
};

const convertUserValues = ({ user, score, coins, XP, timeToFinish }) => {
  const topScore = parseInt(user.topScore, 10);
  const totalCoins = parseInt(user.totalCoins, 10) + parseInt(coins, 10);
  const totalXP = parseInt(user.XP, 10) + parseInt(XP, 10);
  if (score > topScore) {
    user = {
      ...user,
      topScore: score,
      totalCoins: totalCoins,
      XP: totalXP,
      coins: coins,
      score: score,
      fastestTime: timeToFinish,
    };
  } else {
    user = {
      ...user,
      totalCoins: totalCoins,
      XP: totalXP,
      coins: coins,
      score: score,
    };
  }
  return user;
};

const saveResult =
  (dispatch) =>
  async ({
    score,
    coins,
    XP,
    timeToFinish,
    nWrongAnswers,
    nCorrectAnswers,
  }) => {
    var user = await AsyncStorage.getItem("user").then(JSON.parse);
    user = convertUserValues({ user, score, coins, XP, timeToFinish });
    await AsyncStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: "update_info",
      payload: {
        totalCoins: parseInt(user.totalCoins, 10),
        topScore: parseInt(user.topScore, 10),
        XP: parseInt(user.XP, 10),
        fastestTime: user.fastestTime,
        score: score,
        coins: coins,
      },
    });

    /*
    // I dont know the correct flow, but here I'm calling the api to generate the dynamic link.
    let data = {
      name: user.username,
      timeToFinish,
      nWrongAnswers,
      nCorrectAnswers
    }
    let R = await Caller.challenge("POST", data);
    // Here urlCode will be used for challenge url.
    if("urlCode" in R)
    {
      const prefix = Linking.createURL('/');
      let challengeUrl = prefix + "c/" + R.urlCode;
      // This challenge url will be send to other user through text message.
      console.log("challengeUrl => ", challengeUrl);
    }
    */
  };

const tryGetAvatar = (dispatch) => async () => {
  //await AsyncStorage.removeItem("user");
  const user = await AsyncStorage.getItem("user").then(JSON.parse);
  if (!user) {
    return false;
  } else {
    await dispatch({
      type: "commit_info",
      payload: {
        avatar: user.avatar,
        username: user.username,
        totalCoins: user.totalCoins,
        topScore: user.topScore,
        score: user.score,
        coins: user.coins,
        XP: user.XP,
        fastestTime: user.fastestTime,
      },
    });
    return true;
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { chooseAvatar, chooseUserName, submitInfo, tryGetAvatar, saveResult },
  {
    avatar: "Skillzy Hamster",
    userName: "",
    classLevel: "",
    errorMessage: "",
    totalCoins: 0,
    XP: 0,
    topScore: 0,
    coins: 0,
    score: 0,
    fastestTime: null,
  }
);
