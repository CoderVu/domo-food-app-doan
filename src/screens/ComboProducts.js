import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCombos } from '../components/Redux/Action/productActions';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppText from '../components/common/AppText';
import { colors } from '../theme/colors';

const ComboProducts = ({ onScroll }) => {
  const dispatch = useDispatch();
  const { allCombos = [], loading, error } = useSelector((state) => state.product);
  const navigation = useNavigation();

  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    dispatch(fetchAllCombos());
  }, [dispatch]);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (comboId) => {
    navigation.navigate('ComboDetails', { comboId });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => handlePress(item.comboId)}
    >
      <Animated.View style={[styles.cardImageContainer, { transform: [{ scale }] }]}>
        <Image
          source={{ uri: `data:image/png;base64,${item.image}` }}
          style={styles.image}
        />
      </Animated.View>
      <View style={styles.cardBody}>
        <View style={styles.nameContainer}>
          <AppText text={item.comboName} customStyles={styles.textBold} />
        </View>
        {/* Rating moved below name */}
        <AppText
          text={item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description}
          customStyles={styles.textMedium}
        />
        <View style={styles.cardFooter}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="star" size={13} color={colors.yellow} />
            <AppText text={`(${item.averageRate}.0)`} customStyles={styles.textMedium} />
          </View>
          <AppText
            text={`${item.price.toLocaleString()} đ`}
            customStyles={styles.priceText}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        onScroll={onScroll}
        data={allCombos}
        renderItem={renderItem}
        keyExtractor={(item) => item.comboId.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameContainer: {
    marginBottom: 5, // Add space between name and rating
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  textBold: {
    fontFamily: 'Lato-Black',
    color: colors.dark,
    fontSize: 16,
  },
  textMedium: {
    fontFamily: 'Lato-Regular',
    color: colors.medium,
    fontSize: 14,
  },
  cardFooter: {
    marginTop: 10,
    flexDirection: 'row', // Align rating and price horizontally
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
});


export default ComboProducts;
