import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdCategory } from '../../components/Redux/Action/productActions';
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Card/Card"; 

const CategoryItems = ({ categoryId }) => {
    const dispatch = useDispatch();
    const productsByCategory = useSelector((state) => state.product.productsByCategory);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByIdCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    const categoryItems = productsByCategory[categoryId] || []; // Đảm bảo có giá trị mặc định

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
        <FlatList

            data={categoryItems} // Truyền trực tiếp danh sách sản phẩm
            renderItem={({ item }) => (
                <Card item={item} /> // Hiển thị mỗi sản phẩm với Card
            )}
            keyExtractor={(item) => item.productId.toString()} 
            numColumns={2} // Hiển thị 2 cột
            columnWrapperStyle={styles.row} 
            contentContainerStyle={styles.container}
   
         
        />
        </View>
    );
};

export default CategoryItems;


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10, 
    },
    row: {
      justifyContent: 'space-between', 
      marginBottom: 15, 
    },
    card: {
      flex: 1,
      margin: 5,
      borderRadius: 10, 
    },
  });