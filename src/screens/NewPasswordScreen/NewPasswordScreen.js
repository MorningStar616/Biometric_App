import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const NewPasswordScreen = () => {
  const [code, setCode] = useState('');

  const [newPassword, setNewPassword] = useState('');
  

  const onSubmitPressed = () => {
    console.warn("onSubmitPressed");
  }

  const onSignInPressed = () => {
    console.warn("onSignUpPressed");
  }

  const {height} = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.root}>

        <Text 
          style={styles.title}>Reset Password
        </Text>
        <Text 
          style={styles.additionalText}>Input the Email linked with your account</Text>

        <CustomInput 
          placeholder="Code" 
          value={code} 
          setValue={setCode} 
        />

        <CustomInput 
          placeholder="New Password" 
          value={newPassword} 
          setValue={setNewPassword} 
        />
        
        <CustomButton 
          text="Submit" 
          onPress={onSubmitPressed}
        />

        <View style={styles.horizontalLine} />

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
    marginTop: 180,
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

export default NewPasswordScreen;
