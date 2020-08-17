import { HeaderButton } from "react-navigation-header-buttons";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Colors from "../constants/Colors";

const customHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default customHeaderButton;
