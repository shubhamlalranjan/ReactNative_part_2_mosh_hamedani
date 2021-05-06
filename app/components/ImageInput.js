import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import defaultStyle from "../config/styles";
import Icon from "./Icon";

import * as ImagePicker from "expo-image-picker";

function ImageInput({ style, onPress, ...other }) {
  const selectImage = async () => {
    try {
      //   const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
      //   if (granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        console.log(result.uri);
        onPress(result.uri);
      }
      //   } else {
      //     alert(
      //       "Libary Permission Required! \n Please Give the libary permission "
      //     );
      //   }
    } catch (error) {
      console.log("error", error.message);
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      {...other}
      style={[styles.container, style]}
      onPress={selectImage}
    >
      <Icon name="camera" backgroundColor={defaultStyle.colors.dark} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: defaultStyle.colors.medium,
  },
});

export default ImageInput;
