import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import AppText from "../common/AppText";
import { colors } from "../../theme/colors";

const TabBar = ({ jumpTo, navigationState: { index, routes } }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && routes.length > 0) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  }, [index, routes]);

  const renderItem = ({ item, index: routeIndex }) => (
    <TouchableOpacity
      key={item.key}
      onPress={() => jumpTo(item.key)}
      style={[
        styles.tabBarItem,
        { backgroundColor: routeIndex === index ? colors.primary : colors.white },
      ]}
    >
      <AppText
        text={item.title}
        customStyles={[
          styles.tabBarLabel,
          { color: routeIndex === index ? colors.white : colors.medium },
        ]}
      />
    </TouchableOpacity>
  );

  const getItemLayout = (data, index) => ({
    length: 50, // approximate height of each item
    offset: 50 * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={routes}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: colors.light,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabBarItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 5,
  },
  tabBarLabel: {
    fontFamily: "Lato-Black",
    fontSize: 16,
  },
});