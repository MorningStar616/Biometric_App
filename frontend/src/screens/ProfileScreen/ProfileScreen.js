import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    profilePhoto: require('../../../assets/images/logo-color-bg.png'),
    email: 'johndoe@example.com',
    position: 'Software Engineer',
    dob: '01/01/1990',
    phoneNumber: '+1234567890',
  });

  const handleEditProfile = () => {
    // Navigate to the edit profile screen
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, let's just log a message
    console.log('User logged out.');
  };

  return (
    <ScrollView style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Cover source={userData.profilePhoto} style={styles.cover} />
        <View style={styles.cardContent}>
          <Avatar.Image source={userData.profilePhoto} size={100} />
          <Title style={styles.username}>{userData.username}</Title>
          <Paragraph style={styles.userInfo}>Email: {userData.email}</Paragraph>
          <Paragraph style={styles.userInfo}>Position: {userData.position}</Paragraph>
          <Paragraph style={styles.userInfo}>DOB: {userData.dob}</Paragraph>
          <Paragraph style={styles.userInfo}>Phone: {userData.phoneNumber}</Paragraph>
        </View>
        <Card.Actions style={styles.cardActions}>
          <Button mode="contained" onPress={handleEditProfile} style={styles.editButton}>
            Edit Profile
          </Button>
          <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  card: {
    margin: 16,
    borderRadius: 12,
  },
  cover: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    paddingTop: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardActions: {
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
});

export default ProfileScreen;
