import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as K from "../constants";

const data = [
  { label: "1. Klasse", value: "1" },
  { label: "2. Klasse", value: "2" },
  { label: "3. Klasse", value: "3" },
  { label: "4. Klasse", value: "4" },
  { label: "5. Klasse", value: "5" },
  { label: "6. Klasse", value: "6" },
  { label: "7. Klasse", value: "7" },
  { label: "8. Klasse", value: "8" },
  { label: "10. Klasse", value: "9" },
  { label: "Not in school", value: "10" },
];

const DropdownComponent = ({ onChangeClass }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemTextStyle={{ color: K.cDark }}
      data={data}
      maxHeight={200}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? "Select class" : "..."}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        onChangeClass(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: "50%",
    borderColor: K.cWhite,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: K.cWhite,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: K.cWhite,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: K.cWhite,
  },
});
