import { StyleSheet, Text, useWindowDimensions, View , ActivityIndicator} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabView } from "react-native-tab-view";
import { fetchAllCategories } from '../Redux/Action/categoryActions';
import CategoryItems from "../CategoryItems/CategoryItems";
import TabBar from "./TabBar";
import Screen from "../../components/Screen/Screen";
import { colors } from "../../theme/colors";
const TabViewComponent = ({ onScroll }) => {
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { dataCategories } = useSelector((state) => state.category);

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
  };

  if (loading || dataCategories.length === 0) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
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
          return <CategoryItems categoryId={route.key} onScroll={onScroll} />;
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