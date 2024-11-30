import { StyleSheet, Image, View } from "react-native";
import React, { useState } from "react";
import AppHeader from "../components/common/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/common/AppText";
import Button from "../components/common/Button";
import { colors } from "../theme/colors";
import Quantity from "../components/Quantity/Quantity";
import MiniCard from "../components/MiniCard/MiniCard";

const Details = () => {
  const [quantity, setQuantity] = useState(2);
  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((quantity) => {
      if (quantity === 0) {
        return quantity;
      } else {
        return quantity - 1;
      }
    });
  };
  return (
    <Screen>
      <AppHeader title="Details" customTitleStyles={{ marginLeft: "35%" }} />
      <View style={styles.headerImage}>
        <Image
          source={require("../../assets/images/foods/burger-1.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.directionRowSpaceBetween}>
          <AppText text={"Burger 1"} customStyles={styles.title} />
          <AppText text={"(109 Reviews)"} customStyles={styles.textMedium} />
        </View>
        <View style={styles.directionRowSpaceBetween}>
          <Quantity
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
          <AppText text={"$50.00"} customStyles={styles.textMedium} />
        </View>
        <View style={styles.directionRowSpaceBetween}>
          <MiniCard icon={"star"} title={"5.0"} subtitle={"Rating"} />
          <MiniCard icon={"camera"} title={"40"} subtitle={"Photos"} />
        </View>
        <View style={styles.details}>
          <AppText text="Food Details" customStyles={styles.title} />
          <AppText
            text="Esse aute irure deserunt laboris voluptate magna anim esse Lorem ea ad ex ex. Excepteur non ad dolore aliqua et aute elit irure consectetur esse aliqua est. Exercitation aute qui id proident duis quis quis aute est."
            customStyles={styles.description}
          />
        </View>
        <Button
          label={"Add to cart"}
          customStyles={styles.button}
          customLabelStyles={styles.buttonLabel}
        />
      </View>
    </Screen>
  );
};

export default Details;

const styles = StyleSheet.create({
  headerImage: {
    flex: 0.3,
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  body: {
    flex: 0.7,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  directionRowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  details: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Lato-Black",
    fontSize: 20,
    marginBottom: 10,
  },
  textMedium: {
    fontFamily: "Lato-Black",
    color: colors.medium,
  },
  description: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.gray,
  },
  button: {
    alignSelf: "center",
    width: "90%",
    marginVertical: 20,
    paddingVertical: 15,
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 20,
  },
});
