import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyle from "../config/styles";

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (!granted) {
      alert("You need to enable the permission to access Images");
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {}
  };
  const handlePress = async () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you Shure want to Delete the image!", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container]} onPress={selectImage}>
        {!imageUri ? (
          <MaterialCommunityIcons
            name="camera"
            backgroundColor={defaultStyle.colors.medium}
            size={40}
          />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultStyle.colors.light,
    overflow: "hidden",
  },
  image: {
    borderRadius: 15,
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
