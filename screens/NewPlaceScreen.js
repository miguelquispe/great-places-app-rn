import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = ({ navigation, route }) => {
  const [titleValue, setTitleValue] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const imageSelectedHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const onLocationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImagePicked={imageSelectedHandler} />
        <LocationPicker
          navigation={navigation}
          route={route}
          onLocationPicked={onLocationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
