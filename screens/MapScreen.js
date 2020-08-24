import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: -12.046373,
    longitude: -77.042755,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0422,
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocationHandler}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;
