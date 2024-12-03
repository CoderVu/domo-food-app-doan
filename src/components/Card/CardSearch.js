import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from './Card'; // Your Card component

const CardSearch = forwardRef(({ items = [] }, ref) => {
  const flatListRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }
  }));

  const renderItem = ({ item }) => {
    return (
      <Card item={item} style={styles.card} />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.productId.toString()}
      numColumns={2} // Display 2 columns
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      nestedScrollEnabled={true} // Enable nested scrolling
    />
  );
});

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