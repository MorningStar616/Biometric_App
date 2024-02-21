import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    axios.post('http://192.168.1.7:5000/register', { username, position, email })
      .then(response => {
        navigation.navigate('Confirm Email');
      })
      .catch(error => {
        console.error('Error registering:', error);
        if (error.response && error.response.data && error.response.data.error === 'Username already exists') {
          // Alert user that username already exists
          Alert.alert('Error', 'Username already exists. Please choose a different username.');
        } else {
          // Handle other errors, e.g., show a generic error message to the user
          Alert.alert('Error', 'An error occurred while registering. Please try again later.');
        }
      });
  }
  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  }

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  }

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  }


  const {height} = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text 
          style={styles.title}>Sign Up
        </Text>
        <Text 
          style={styles.additionalText}>Create your account and access your tools</Text>

        <CustomInput 
          placeholder="Username" 
          value={username} 
          setValue={setUsername} 
        />
        <CustomInput 
          placeholder="Position" 
          value={position} 
          setValue={setPosition} 
        />
        <CustomInput 
          placeholder="Email" 
          value={email} 
          setValue={setEmail} 
        />
        
        <Text 
          style={styles.text}>By registering, you confirm that you accept our 
          <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and 
          <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
        </Text>

        <CustomButton 
          text="Register" 
          onPress={onRegisterPressed}
        />

        <View style={styles.horizontalLine} />


        <CustomButton 
          text="Already have an account? Sign In" 
          onPress={onSignInPressed}
          type= 'TERTIARY'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 55,
  },
  title: {
    marginTop: 80,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#333',
  },
  additionalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    color: 'grey',
    marginVertical: 20,
  },
  link: {
    color: '#40AE2D'
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAD0D0',
    width: '100%',
    marginVertical: 20,
  },
});

export default SignUpScreen;
