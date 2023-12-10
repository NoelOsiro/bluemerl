import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { useThemeColor, Text } from './Themed';
interface YourMemberType {
  address: string;
  first_name: string;
  gender: string;
  last_name: string;
  member_uuid: string;
  phone: string;
  subscription_status: boolean;
}
interface ScanResultComponentProps {
  result: string | null;
  loading: boolean;
  onScanAgain: () => void;
  member: YourMemberType;
}

const getBorderColor = (theme: string) => (theme === 'dark' ? 'white' : 'black');

const ScanResultComponent: React.FC<ScanResultComponentProps> = (props: ScanResultComponentProps) => {
  const theme = useThemeColor({}, 'background');
  const borderColor = getBorderColor(theme);
  const firstLetter = props.member.first_name.charAt(0).toUpperCase();

  return (
    <View style={styles.scanResultContainer}>
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

        <TouchableOpacity onPress={props.onScanAgain} style={styles.scanAgainButton}>
          <Text style={styles.scanAgainButtonText}>Scan Again</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  scanResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scanAgainButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cardContainer: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 25,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop: 8,
    alignItems: 'center', // Center text horizontally
  },
  textStyle: {
    marginTop: 8,
    color: Colors.dark.background,
  },
});



export default ScanResultComponent;
