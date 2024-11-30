import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import TabView from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import { fetchProductBySearch } from "../components/Redux/Action/productActions";
import CardSearch from "../components/Card/CardSearch";
import AppFooter from "../components/common/AppFooter";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.product.allProductsBySearchQuery);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  console.log('searchResults:', searchResults);
  console.log('loading:', loading);
  console.log('error:', error);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const cardSearchRef = useRef(null);

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

  return (
    <Screen>
      <SearchHeader onSearch={handleSearch} />
      <View style={styles.container}>
      <PromotionCard slides={slides} />

        {!isSearching && (
          <View style={styles.categories}>
            <SectionTitle title="Danh mục sản phẩm" popular />
             <TabView />
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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