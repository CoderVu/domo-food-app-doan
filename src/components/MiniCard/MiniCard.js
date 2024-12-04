import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const MiniCard = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={22} color={colors.primary} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,  // Clean white background for modern look
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,  // Slightly more rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,  // Enhanced shadow effect for depth
    marginVertical: 8,  // Some spacing between cards
  },
  icon: {
    marginRight: 16,  // Increased space between icon and text for modern layout
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,  // Slightly larger title for better readability
    color: colors.dark,
    fontWeight: '600',  // Modern weight
  },
  subtitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.medium,
    marginTop: 2,  // Small margin between title and subtitle
  },
});

export default MiniCard;
