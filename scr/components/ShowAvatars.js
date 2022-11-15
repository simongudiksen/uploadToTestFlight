import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import * as K from "../constants";

const ShowAvatars = ({ onClick, styleContainer }) => {
  const [isActive, setIsActive] = useState([false, false, false]);
  const avatars = K.avatars;

  const handleClick = ({ index, avatar }) => {
    const list = [false, false, false];
    list[index] = true;
    setIsActive(list);
    onClick(avatar);
  };

  return (
    <View style={styleContainer}>
      <FlatList
        style={styles.carousel}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        data={avatars}
        keyExtractor={(avatar) => avatar.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.column}>
              <View style={styles.subColumn}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    handleClick({ index: item.index, avatar: item.title })
                  }
                >
                  <Image
                    style={[styles.imageStyle]}
                    source={item.imageShadow}
                  />
                  <Text
                    style={[
                      styles.text,
                      { color: isActive[item.index] ? "#264653" : K.cWhite },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                {isActive[item.index] ? (
                  <AntDesign name="checkcircle" size={20} color={K.cWhite} />
                ) : null}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  carousel: {
    flexGrow: 1,
    padding: 30,
  },
  contentContainerStyle: {
    paddingLeft: "15%",
    paddingRight: "15%",
  },
  column: {
    height: "100%",
    aspectRatio: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  subColumn: {
    height: "85%",
    aspectRatio: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: "15%",
    marginTop: "3%",
  },
  button: {
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: K.cWhite,
  },
  imageStyle: {
    height: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  text: {
    alignSelf: "center",
    justifyContent: "flex-end",
    position: "absolute",
    top: 10,
    fontWeight: "900",
  },
});

export default ShowAvatars;
