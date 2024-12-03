import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import TabViewComponent from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import { fetchProductBySearch } from "../components/Redux/Action/productActions";
import CardSearch from "../components/Card/CardSearch";
import AppFooter from "../components/common/AppFooter";
import Icon from "react-native-vector-icons/MaterialIcons"; 

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.product.allProductsBySearchQuery);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const cardSearchRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerVisibility = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      backgroundImage: require("../../assets/images/baner1.png"),
      promotionText: "Discount 50% on all items!",
      contact: "123-456-7890",
      website: "www.example1.com",
    },
    {
      backgroundImage: require("../../assets/images/baner2.png"),
      promotionText: "Buy 1 Get 1 Free!",
      contact: "987-654-3210",
      website: "www.example2.com",
    },
    {
      backgroundImage: require("../../assets/images/paner3.png"),
      promotionText: "Limited Time Offer!",
      contact: "555-555-5555",
      website: "www.example3.com",
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      dispatch(fetchProductBySearch(query));
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
    } else {
      setResults(searchResults);
      if (cardSearchRef.current) {
        cardSearchRef.current.scrollToTop();
      }
    }
  }, [searchQuery, searchResults]);

  const isSearching = searchQuery && results.length > 0;

  const headerHeight = headerVisibility.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], 
  });

  const headerOpacity = headerVisibility.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], 
  });

  const toggleHeaderVisibility = () => {
    Animated.timing(headerVisibility, {
      toValue: headerVisibility.__getValue() === 1 ? 0 : 1, 
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Screen>
      <SearchHeader onSearch={handleSearch} />
      <View style={styles.container}>
        <Animated.View style={[styles.header, { height: headerHeight, opacity: headerOpacity }]}>
          <PromotionCard slides={slides} />
        </Animated.View>

        {/* Arrow button to toggle visibility of PromotionCard */}
        <TouchableOpacity style={styles.toggleButton} onPress={toggleHeaderVisibility}>
          <Icon
            name={headerVisibility.__getValue() === 1 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="white" // White for visibility on purple background
          />
        </TouchableOpacity>

        {!isSearching && (
          <View style={styles.categories}>
            <TabViewComponent />
          </View>
        )}
        
        {isSearching && (
          <View style={styles.searchResults}>
            <CardSearch
              ref={cardSearchRef}
              items={results}
              nestedScrollEnabled={true}
            />
          </View>
        )}

        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
      </View>
      <AppFooter navigation={navigation} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,  // Ensure the button is on top
    backgroundColor: "#7b61ff", // Purple background
    padding: 10,
    borderRadius: 30,  // Circular button
  },
  categories: {
    paddingHorizontal: 10,
    flex: 1,
  },
  searchResults: {
    padding: 10,
    flex: 1,
  },
});

export default Home;
