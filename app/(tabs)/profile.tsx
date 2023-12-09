import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen() {
  // Dummy user data (replace this with actual user data)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    role: 'User',
    // Add other user details as needed
  };

  return (
    <View style={styles.container}>
      {/* User Icon and Name */}
      <View style={styles.userContainer}>
        <View style={styles.userIcon}>
          {/* Replace the source with the actual user image */}
          <Image source={require('../../assets/images/icon.png')} style={styles.userImage} />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* User Details in Chat Format */}
      <ScrollView style={styles.chatContainer}>
        <View style={styles.chatItemLeft}>
          <Text style={styles.chatHeaderText}>Email</Text>
          <View style={styles.chatBubbleLeft}>
            <Text style={styles.chatText}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.chatItemRight}>
          <Text style={styles.chatHeaderText}>Phone</Text>
          <View style={styles.chatBubbleRight}>
            <Text style={styles.chatText}>{user.phone}</Text>
          </View>
        </View>
        <View style={styles.chatItemLeft}>
          <Text style={styles.chatHeaderText}>Gender</Text>
          <View style={styles.chatBubbleLeft}>
            <Text style={styles.chatText}>{user.gender}</Text>
          </View>
        </View>
        <View style={styles.chatItemRight}>
          <Text style={styles.chatHeaderText}>Role</Text>
          <View style={styles.chatBubbleRight}>
            <Text style={styles.chatText}>{user.role}</Text>
          </View>
        </View>
        {/* Add other user details as needed */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatContainer: {
    marginTop: 20,
  },
  chatItemLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  chatItemRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  chatHeaderText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chatBubbleLeft: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%', // Adjust as needed
  },
  chatBubbleRight: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%', // Adjust as needed
  },
  chatText: {
    color: 'white',
  },
});
