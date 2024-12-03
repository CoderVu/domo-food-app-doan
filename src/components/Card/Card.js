import { StyleSheet, Image, View, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AppText from "../common/AppText";
import { colors } from "../../theme/colors";

// Initialize the Geocoder with your API key
const API_KEY = '5b3ce3597851110001cf624888c86f18453143d7892cff533a74a371';

const Card = ({ item }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState("Loading...");
  const [storeIndex, setStoreIndex] = useState(0); // Track the current store index
  const [storeLocations, setStoreLocations] = useState([]);
  const scale = useState(new Animated.Value(1))[0]; // Animation state for scaling the card
  
  // Giới hạn độ dài của mô tả (10 ký tự) và địa chỉ (5 ký tự)
  const descriptionText = item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description;
  const locationText = location.length > 5 ? location.slice(0, 5) + '...' : location;

  useEffect(() => {
    // console.log('Starting geocoding request...');
    const fetchLocation = async (store) => {
      const { latitude, longitude } = store;
      // console.log('Location:', latitude, longitude);
      if (latitude && longitude) {
        try {
          const response = await fetch(`https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${API_KEY}`);
          const data = await response.json();
          if (data?.features?.length > 0) {
            const address = data.features[0].properties.county;
            return address;
          } else {
            return "Loading...";
          }
        } catch (error) {
          console.warn("Geocoding error: ", error);
          return "Error retrieving address";
        }
      }
    };

    // Fetch location for all stores
    if (item?.stores && item.stores.length > 0) {
      const storeAddresses = [];
      item.stores.forEach((store) => {
        const address = fetchLocation(store);
        storeAddresses.push(address);
      });
      setStoreLocations(storeAddresses);
    }
  }, [item]);

  // Change store every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStoreIndex((prevIndex) => (prevIndex + 1) % item.stores.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [item.stores.length]);

  // Update location text based on the current store
  useEffect(() => {
    if (storeLocations.length > 0) {
      setLocation(storeLocations[storeIndex]);
    }
  }, [storeIndex, storeLocations]);

  const handlePressIn = () => {
    // Scale the card up when the user presses it
    Animated.spring(scale, {
      toValue: 1.05, // Scale up slightly
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Reset scale when the user releases the press
    Animated.spring(scale, {
      toValue: 1, // Reset to original scale
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    // console.log("Navigating to Details for productId:", item.id);
    navigation.navigate("Details", {
      productId: item.id,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { alignSelf: 'flex-start' }]}
      onPressIn={handlePressIn}  // Trigger animation when pressed
      onPressOut={handlePressOut} // Reset animation when released
      onPress={handlePress}
    >
      <Animated.View
        style={[styles.cardImageContainer, { transform: [{ scale }] }]} // Apply scale animation
      >
        <Image
          source={{ uri: `data:image/png;base64,${item.image}` }}
          style={styles.image}
        />
      </Animated.View>
      <View style={styles.cardBody}>
        {/* Product Name and Rating in Row */}
        <View style={styles.nameRatingContainer}>
          <AppText text={item.productName} customStyles={styles.textBold} />
          <View style={styles.iconTextContainer}>
            <Ionicons name="star" size={13} color={colors.yellow} />
            <AppText text={`(${item.averageRate}.0)`} customStyles={styles.textMedium} />
          </View>
        </View>
        <AppText text={descriptionText} customStyles={styles.textMedium} />
        <View style={[styles.directionRow, styles.cardFooter]}>
          {/* Price */}
          <AppText
            text={`đ${item.price}`}
            customStyles={[styles.priceText, { marginRight: 10 }]} 
          />
          
          {/* Address */}
          <View style={styles.iconTextContainer}>
            <Ionicons name="location" size={13} color={colors.primary} />
            <AppText text={locationText} customStyles={styles.textMedium} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    width: "48%", // Adjust width for better spacing between items
    marginHorizontal: "2%", // Add space between items
    marginTop: 10, // Add space between rows
    marginLeft: 2, // Offset the margin for the first item in the row
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 15, // Smooth corner radius
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6, // Android shadow
    overflow: "hidden",
    backgroundImage: "linear-gradient(to top, #fff, #f7f8fa)", // Gradient background
  },
  cardImageContainer: {
    width: "100%",
    height: 130, // Consistent height
    borderRadius: 15,
    overflow: "hidden", // Clip the image to the border radius
  },
  priceText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Lato-Bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.lightPrimary, // Subtle background for price
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover", // Ensure proper scaling
  },
  cardBody: {
    marginTop: 10,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  nameRatingContainer: {
    flexDirection: "row", // Align product name and rating horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space out product name and rating
    width: "100%",
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  textMedium: {
    color: colors.medium,
    fontFamily: "Lato-Regular",
    fontSize: 12,
    marginLeft: 4,
  },
  textBold: {
    fontFamily: "Lato-Black",
    color: colors.dark,
    fontSize: 16, // Larger font for emphasis
  },
});
