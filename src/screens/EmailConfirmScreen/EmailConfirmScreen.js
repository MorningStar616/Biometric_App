import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const EmailConfirmScreen = () => {
  const [code, setCode] = useState('');
  

  const onConfirmPressed = () => {
    console.warn("onConfirmPressed");
  }

  const onResendPressed = () => {
    console.warn("onResendPressed");
  }

  const onSignInPressed = () => {
    console.warn("onSignUpPressed");
  }

  const {height} = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text 
          style={styles.title}>Confirm Email
        </Text>
        <Text 
          style={styles.additionalText}></Text>

        <CustomInput 
          placeholder="Enter your confirmation code" 
          value={code} 
          setValue={setCode} 
        />
        
        <CustomButton 
          text="Confirm" 
          onPress={onConfirmPressed}
        />

        <View style={styles.horizontalLine} />

        <CustomButton 
          text="Resend Code" 
          onPress={onResendPressed}
          type= 'SECONDARY'
        />

        <CustomButton 
          text="Back to Sign In" 
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
    padding: 30,
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

export default EmailConfirmScreen;
