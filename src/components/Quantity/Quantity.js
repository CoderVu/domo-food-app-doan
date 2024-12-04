import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const Quantity = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.decreaseButton]}
        onPress={decreaseQuantity}
      >
        <Ionicons name="remove" size={24} color={colors.white} />
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={[styles.button, styles.increaseButton]}
        onPress={increaseQuantity}
      >
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,  // Clean background color
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  decreaseButton: {
    backgroundColor: colors.danger,
  },
  increaseButton: {
    backgroundColor: colors.success,
  },
  quantityText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: colors.black,
    marginHorizontal: 10,
  },
});

export default Quantity;
