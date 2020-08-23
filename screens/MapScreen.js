import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = (props) => {
  const mapRegion = {
    latitude: -12.046373,
    longitude: -77.042755,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0422,
  };
  return <MapView style={styles.map} region={mapRegion} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
