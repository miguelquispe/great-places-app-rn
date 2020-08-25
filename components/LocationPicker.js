import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const { onLocationPicked } = props;

  // Ternary
  // const mapPickedLocation = props.route.params
  //   ? props.route.params.pickedLocation
  //   : null;
  // Chaining
  const mapPickedLocation = props.route.params?.pickedLocation ?? null;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grand location permissions to use this app",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      console.log("location", location);

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location",
        "Please try again or pick a  location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get user location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on the map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LocationPicker;
