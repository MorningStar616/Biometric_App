/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
/*import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import EmailConfirmScreen from './src/screens/EmailConfirmScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';*/
import Navigation from './src/navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
  );
};

export default App;
