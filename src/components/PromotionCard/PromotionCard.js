import { StyleSheet, FlatList, View, ImageBackground, Dimensions } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import AppText from "../common/AppText";
import { colors } from "../../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PromotionCard = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(slideIndex);
  };

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      <ImageBackground source={item.backgroundImage} style={styles.image}>
        <View style={styles.overlay}>
          <AppText text={item.promotionText} customStyles={styles.promotionText} />
          <View style={styles.contactContainer}>
            <Feather name="phone" size={15} color={colors.white} />
            <AppText text={item.contact} customStyles={styles.textWhite} />
          </View>
          <View style={styles.contactContainer}>
            <Feather name="globe" size={15} color={colors.white} />
            <AppText text={item.website} customStyles={styles.textWhite} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View>
      <FlatList
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default PromotionCard;

const styles = StyleSheet.create({
  slide: {
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  promotionText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "Lato-Black",
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  textWhite: {
    color: colors.white,
    marginLeft: 5,
    fontFamily: "Lato-Regular",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,

  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.medium,
    marginHorizontal: 4,

    
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,

  },
});
