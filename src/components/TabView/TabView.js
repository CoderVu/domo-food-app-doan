import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabView } from "react-native-tab-view";
import { fetchAllCategories } from '../Redux/Action/categoryActions';
import CategoryItems from "../CategoryItems/CategoryItems";
import TabBar from "./TabBar";

const TabViewComponent = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { dataCategories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (dataCategories.length > 0) {
      setRoutes(
        dataCategories.map((category) => ({
          key: category.categoryId.toString(),
          title: category.categoryName,
        }))
      );
    }
  }, [dataCategories]);

  const handleIndexChange = (index) => {
    setIndex(index);
    const selectedRoute = routes[index];
 
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={(props) => <TabBar {...props} />}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          return <CategoryItems categoryId={route.key} />;
        }}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        sceneContainerStyle={styles.sceneContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
  },
});

export default TabViewComponent;