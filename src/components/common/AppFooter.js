import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const AppFooter = ({ navigation: propNavigation }) => {
  const navigation = propNavigation || useNavigation();

  const handlePress = (route) => {
    if (route === 'home') {
      navigation.navigate('Home');
    } else if (route === 'history') {
      navigation.navigate('MyOrder');
    } else if (route === 'cart') {
      navigation.navigate('MyCart');
    } else if (route === 'profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handlePress('home')}>
        <Feather name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('history')}>
        <Feather name="shopping-bag" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('cart')}>
        <Feather name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('profile')}>
        <Feather name="user" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default AppFooter;