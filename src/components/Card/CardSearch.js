import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from './Card'; // Component Card của bạn

const CardSearch = ({ items = [] }) => {
  const renderItem = ({ item }) => {
    return (
      <Card item={item} style={styles.card} />
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.productId.toString()}
      numColumns={2} // Hiển thị 2 cột
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
      nestedScrollEnabled={true} // Cho phép cuộn lồng nhau
    />
  );
};

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

export default CardSearch;