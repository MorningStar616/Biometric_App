/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo-color.png';
import CustomInput from '../../components/CustomInput/CustomInput';

const SignInScreen = () => {
  const {height} = useWindowDimensions();

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.3}]}resizeMode="contain" />
      <CustomInput />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
