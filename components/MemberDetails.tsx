// MemberDetails.tsx
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MonoText } from './StyledText';
import { YourMemberType } from '../util/hooks';
import {Text} from './Themed';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';

interface MemberDetailsProps {
  item: YourMemberType;
  handleCheckIn: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ item, handleCheckIn }) => {
  const firstLetter = item?.first_name[0].toUpperCase() || '';

  return (
    <View style={styles.container}>
        <View style={styles.roundImage}>
          <Text style={styles.letter}>{firstLetter}</Text>
        </View>
        <Text style={styles.title}>{`${item.first_name} ${item.last_name}`}</Text>
        <Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          {item.phone}
        </Text>
        <MonoText>{item.address}</MonoText>
        <Text style={[styles.textStyle, { color: item.subscription_status ? 'green' : 'red', marginTop: 8 }]}>
          Subscription: {item.subscription_status ? 'Active ✅' : '❌ Expired '}
        </Text>
        {/* Check-In button */}
        <TouchableOpacity onPress={() => handleCheckIn()} style={styles.checkInButton}>
          <Text style={styles.checkInButtonText}>Check In</Text>
        </TouchableOpacity>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textStyle: {
    marginTop: 8,
    color: Colors.dark.background,
  },
  roundImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  letter: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  checkInButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkInButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MemberDetails;
