import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';

import { Text } from '../../components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { MonoText } from '../../components/StyledText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../util/supabase';

type YourMemberType = {
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
};

export default function ModalScreen() {
  const { uuid } = useLocalSearchParams();
  const [item, setItem] = useState<YourMemberType | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const storedResults = await AsyncStorage.getItem('searchResults');
        if (storedResults) {
          const searchResults: YourMemberType[] = JSON.parse(storedResults);
          const selectedItem = searchResults.find(result => result.uuid === uuid);
          setItem(selectedItem || null);
        }
      } catch (error) {
        console.error('Error retrieving stored search results from AsyncStorage:', error);
      }
    };

    fetchItem();
  }, [uuid]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        let { data: subscriptions, error } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('member_uuid', uuid);
    
        // Handle the data or error here
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      }
    };
    
    // Call the async function
    fetchData();
    
  },[uuid]);
  const firstLetter = item?.first_name[0].toUpperCase() || '';

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>No data found for the given uuid.</Text>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.roundImage}>
        <Text style={styles.letter}>{firstLetter}</Text>
      </View>
      <Text style={styles.title}>{`${item.first_name} ${item.last_name}`}</Text>
      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {item.phone}
      </Text>
      <MonoText>{item.address}</MonoText>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  roundImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
