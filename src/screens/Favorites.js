import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Screen from "../components/Screen/Screen";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import AppText from "../components/AppText/AppText";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";

import { colors } from "../theme/colors";
import { foodItems } from "../data";

const Favorites = () => {
  return (
    <Screen>
      <SearchHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText customStyles={styles.title} text={"Favorites"} />
        {foodItems.slice(0, 10).map((item) => (
          <FavoriteCard key={item.title} item={item} />
        ))}
      </ScrollView>
    </Screen>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontFamily: "Lato-Black",
    color: colors.primary,
    fontSize: 20,
  },
});
