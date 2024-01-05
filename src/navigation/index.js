import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EmailConfirmScreen from '../screens/EmailConfirmScreen';
import ForgotUsernameScreen from '../screens/ForgotUsernameScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='Confirm Email' component={EmailConfirmScreen} />
        <Stack.Screen name='Forgot Username' component={ForgotUsernameScreen} />
        <Stack.Screen name='Reset Password' component={NewPasswordScreen} />
        <Stack.Screen name= 'Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;