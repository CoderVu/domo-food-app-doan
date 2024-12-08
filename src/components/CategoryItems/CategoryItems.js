import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdCategory } from '../../components/Redux/Action/productActions';
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Card/Card"; // Make sure you have the Card component

const CategoryItems = ({ categoryId, onScroll }) => {
    const dispatch = useDispatch();
    const productsByCategory = useSelector((state) => state.product.productsByCategory);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByIdCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    const categoryItems = productsByCategory[categoryId] || []; // Default to empty array

    if (loading) {
        return <Text>Loading...false</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <FlatList
            data={categoryItems} // Pass products data directly
            renderItem={({ item }) => (
                <Card item={item} style={styles.card} /> // Display each product with Card component
            )}
            keyExtractor={(item) => item.productId.toString()} // Unique key
            numColumns={2} // Display 2 columns
            onScroll={onScroll} // Pass onScroll event
            scrollEventThrottle={16} // để scroll mượt hơn
            columnWrapperStyle={styles.row} // Style rows
            contentContainerStyle={styles.container} // Style content
            showsVerticalScrollIndicator={false} // Hide vertical scrollbar
            nestedScrollEnabled={true} // Enable nested scrolling
        />
    );
};

export default CategoryItems;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10, // Add padding for all items
        backgroundColor: '#f0f0f0', // Light gray background
    },
    row: {
        justifyContent: 'space-between', // Distribute items evenly
        marginBottom: 15, // Add space between rows
    },
    card: {
        flex: 1,
        margin: 5,
        borderRadius: 10, // Card rounded corners
    },
});
