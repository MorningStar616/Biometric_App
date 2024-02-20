import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({onPress, text, type= 'PRIMARY'}) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`],type === 'PRIMARY' && styles.text_BOLD]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#40AE2D',
  },

  container_SECONDARY: {
    width: '50%',
    borderRadius: 20,
    borderColor: '#40AE2D',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY:{
    color: '#40AE2D',
  },

  text_TERTIARY: {
    color: 'gray',
  },

  text_BOLD: {
    fontWeight: 'bold',
    fontSize: 18, // Adjust the font size as needed
  },
});

export default CustomButton;
