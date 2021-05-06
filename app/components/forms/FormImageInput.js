import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ImageInput from "../ImageInput";
import ErrorMessage from "./ErrorMessage";

function FormImageInput({ name, imageStyle, imageButtonStyle }) {
  const {
    setTouched,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormikContext();
  const images = values[name] ? values[name] : [];

  const setImage = (value) => {
    console.log("images", images);
    images.push(value);
    setFieldValue(name, images);
  };

  const handleImageDelete = (uri) => {
    setFieldValue(
      name,
      images.filter((image) => uri !== image)
    );
  };

  return (
    <>
      <View style={styles.container}>
        {images &&
          images.map((image, index) => (
            <TouchableWithoutFeedback
              onPress={() => {
                Alert.alert("Confirm", "Do You Want to Delete Pic", [
                  {
                    text: "Cancel",
                    onPress: () => {
                      console.log("Cancel");
                    },
                  },
                  {
                    text: "Ok",
                    onPress: () => {
                      handleImageDelete(image);
                    },
                  },
                ]);
              }}
            >
              <Image
                key={index}
                style={[styles.image, imageStyle]}
                source={{ uri: image }}
              />
            </TouchableWithoutFeedback>
          ))}
        <ImageInput
          style={[imageButtonStyle]}
          onPress={setImage}
          onBlur={() => setTouched(name)}
        />
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 3,
    marginBottom: 5,
  },
});

export default FormImageInput;
