import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo-color-bg.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const onSignInPressed = () => {
    axios.post('http://192.168.1.7:5000/auth', { username })
      .then(response => {
        console.log('Authentication response:', response.data);
        navigation.navigate('Profile');
      })
      .catch(error => {
        console.error('Error authenticating:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
        // Handle error, e.g., show an error message to the user
      });
  }

  const onForgotUsernamePressed = () => {
    navigation.navigate('Forgot Username');
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  }

  const { height } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

        <Text style={styles.textBelowLogo}>Welcome Onboard!</Text>
        <Text style={styles.additionalText}>Sign In to your account</Text>

        <CustomInput placeholder="Username" value={username} setValue={setUsername} />

        <CustomButton text="Authenticate" onPress={onSignInPressed} />
        <CustomButton text="Forgot username?" onPress={onForgotUsernamePressed} type='TERTIARY' />
        <View style={styles.horizontalLine} />
        <CustomButton text="Don't have an account? Sign Up" onPress={onSignUpPressed} type='TERTIARY' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  textBelowLogo: {
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#333', // Change the color as needed
  },
  additionalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAD0D0',
    width: '100%',
    marginVertical: 20,
  },
});

export default SignInScreen;
