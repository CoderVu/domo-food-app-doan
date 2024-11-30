import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../common/AppText";
import { colors } from "../../theme/colors";

const TabBar = ({ jumpTo, navigationState: { index, routes } }) => {
  return (
    <View style={styles.container}>
      {routes.map(({ key, title }, routeIndex) => (
        <TouchableOpacity
          key={key}
          onPress={() => jumpTo(key)}
          style={[
            styles.tabBarItem,
            { 
              backgroundColor: routeIndex === index ? colors.primary : colors.white 
            }
          ]}
        >
          <AppText
            text={title}
            customStyles={[
              styles.tabBarLabel,
              { color: routeIndex === index ? colors.white : colors.medium },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: colors.light, // Add a background color
    borderRadius: 10, // Round the corners
    shadowColor: "#000", // Add a shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },
  tabBarItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20, // Round the tab items
    backgroundColor: colors.white, // Background color for tabs
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // Shadow for Android
  },
  tabBarLabel: {
    fontFamily: "Lato-Black",
    fontSize: 16, // Adjust font size for better readability
  },
});
