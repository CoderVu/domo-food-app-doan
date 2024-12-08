import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity, useWindowDimensions, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for icons
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import TabViewComponent from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import { fetchProductBySearch } from "../components/Redux/Action/productActions";
import CardSearch from "../components/Card/CardSearch";
import AppFooter from "../components/common/AppFooter";
import ComboProducts from "./ComboProducts";
import { colors } from "../theme/colors";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.product.allProductsBySearchQuery);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(0); // State for TabView index
  const [routes] = useState([
    { key: "category", title: "Danh mục sản phẩm" },
    { key: "combo", title: "Combo sản phẩm" },
  ]);
  const cardSearchRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerVisibility = useRef(new Animated.Value(1)).current;
  const layout = useWindowDimensions();

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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 0) {
          Animated.timing(headerVisibility, {
            toValue: 0,
            duration: 0, 
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(headerVisibility, {
            toValue: 1,
            duration: 0, 
            useNativeDriver: false,
          }).start();
        }
      },
    }
  );

  const CategoryRoute = () => (
    <TabViewComponent onScroll={handleScroll} />
  );

  const ComboRoute = () => (
    <ComboProducts onScroll={handleScroll} />
  );

  const renderScene = SceneMap({
    category: CategoryRoute,
    combo: ComboRoute,
  });

  return (
    <Screen>
      <SearchHeader onSearch={handleSearch} />
      <View style={styles.container}>
        <Animated.View style={[styles.header, { height: headerHeight, opacity: headerOpacity }]}>
          <PromotionCard slides={slides} />
        </Animated.View>

        {!isSearching && (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={styles.tabBar}
                indicatorStyle={styles.tabIndicator}
                labelStyle={styles.tabLabel}
              />
            )}
          />
        )}

        {isSearching && (
          <View style={styles.searchResults}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : (
              <CardSearch
                ref={cardSearchRef}
                items={results}
                nestedScrollEnabled={true}
              />
            )}
          </View>
        )}

        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>
      <AppFooter navigation={navigation} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light gray for subtle contrast
  },
  header: {
    overflow: "hidden",
  },
  searchResults: {
    padding: 10,
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.primary,
    elevation: 5, // Adds a shadow for better separation
  },
  tabIndicator: {
    backgroundColor: "#fff",
    height: 4,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.red,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;