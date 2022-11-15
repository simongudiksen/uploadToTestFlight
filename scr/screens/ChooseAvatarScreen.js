import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input } from "react-native-elements";
import * as K from "../constants";
import { Context as AuthContext } from "../context/AuthContext";
import ShowAvatars from "../components/ShowAvatars";
import DropdownComponent from "../components/DropdownComponent";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StackActions } from "@react-navigation/native";

const ChooseAvatarScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [classLevel, setClass] = useState(null);

  const handleSubmit = async ({ avatar, userName, classLevel }) => {};

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Select an Avatar</Text>
      </View>
      <ShowAvatars
        onClick={(newAvatar) => setAvatar(newAvatar)}
        styleContainer={styles.avatarContainer}
      />
      <View style={styles.userNameContainer}>
        <Input
          style={styles.usernameText}
          label="Create a username:"
          labelStyle={styles.subtitleUsername}
          value={userName}
          onChangeText={(newUsername) => setUserName(newUsername)}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.inputStyle}
        />
      </View>
      <View style={styles.dropdownStyle}>
        <Text style={styles.subtitleClass}>Class level:</Text>
        <DropdownComponent
          containerStyle={styles.dropdownStyle}
          onChangeClass={(newClass) => setClass(newClass)}
        />
        {"" != "" ? <Text style={styles.errorMessage}>{}</Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            handleSubmit({
              avatar: avatar,
              userName: userName,
              classLevel: classLevel,
            })
          }
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ChooseAvatarScreen.navigationOptions = () => {
  return { headerShown: false };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#264653",
  },
  avatarContainer: {
    flex: 8,
  },
  userNameContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputStyle: {
    width: "84%",
  },
  textContainer: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  text: {
    color: K.cWhite,
    fontWeight: "900",
    fontSize: RFPercentage(3.5),
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
    marginTop: 15,
  },
  usernameText: {
    color: K.cWhite,
    fontWeight: "300",
    fontSize: 20,
  },
  subtitleUsername: {
    color: K.cWhite,
    fontWeight: "900",
    fontSize: 15,
    paddingBottom: 10,
  },
  subtitleClass: {
    color: K.cWhite,
    fontWeight: "900",
    fontSize: 15,
    paddingBottom: 10,
    paddingLeft: "1%",
  },
  dropdownStyle: {
    paddingBottom: 10,
    flex: 3,
    width: "80%",
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 10,
    flex: 5,
    backgroundColor: "#264653",
  },
  button: {
    borderWidth: 10,
    borderColor: K.cWhite,
    justifyContent: "center",
    backgroundColor: "#2A9D8F",
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    //paddingHorizontal: '10%'
  },
  buttonText: {
    color: K.cWhite,
    fontWeight: "900",
    fontSize: 30,
    padding: 20,
  },
});

export default ChooseAvatarScreen;
