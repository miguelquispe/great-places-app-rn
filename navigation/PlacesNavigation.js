import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

// Screens
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const PlacesStack = createStackNavigator();
const PlacesStackScreen = () => (
  <PlacesStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    }}
  >
    <PlacesStack.Screen
      name="Places"
      component={PlacesListScreen}
      options={({ navigation }) => ({
        headerTitle: "All Places",
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add Place"
              iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
              onPress={() => {
                navigation.navigate("NewPlace");
              }}
            />
          </HeaderButtons>
        ),
      })}
    />
    <PlacesStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    <PlacesStack.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={{
        title: "Add PlAce",
      }}
    />
    <PlacesStack.Screen name="Map" component={MapScreen} />
  </PlacesStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <PlacesStackScreen />
  </NavigationContainer>
);
