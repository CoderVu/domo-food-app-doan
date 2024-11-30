import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Dimensions from '../theme/Dimensions'; // Ensure correct import path

const BigText = ({
  text,
  color = '#332d2b',
  size = 0,
  overflow = 'tail', 
}) => {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode={overflow}
      style={[
        styles.text,
        {
          color: color,
          fontSize: size === 0 ? Dimensions.font20 : size,
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
});

export default BigText;