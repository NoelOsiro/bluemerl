import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Text, useThemeColor } from './Themed';
import Colors from '../constants/Colors';

type CardProps = {
  member: {
    address: string;
    allergies: string;
    created_at: string;
    date_of_birth: string;
    email: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    first_name: string;
    last_name: string;
    medical_conditions: string;
    phone: string;
    registration_date: string;
    uuid: string;
  }
  onPress: (member: any) => void; // Add onPress prop
};

const getBorderColor = (theme: string) => (theme === 'dark' ? 'white' : 'black');

export const Card: React.FC<CardProps> = (props: CardProps) => {
  const theme = useThemeColor({}, 'background');
  const borderColor = getBorderColor(theme);
  const firstLetter = props.member.first_name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity onPress={() => props.onPress(props.member)}>
      <Link href="/(modal)/modal" asChild>
        <View style={styles.cardContainer}>
          <View style={styles.roundImage}>
            <Text style={styles.letter}>{firstLetter}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{props.member.first_name} {props.member.last_name}</Text>
            <Text style={styles.textStyle}>{props.member.phone}</Text>
            <Text style={styles.textStyle}>{props.member.address}</Text>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 25,
    margin: 15,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  roundImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: Colors.light.background,
    fontSize: 24,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  textStyle: {
    marginTop: 8,
    color: Colors.dark.background,
  }
});
