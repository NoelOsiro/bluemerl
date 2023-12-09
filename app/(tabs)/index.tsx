import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import { Card } from '../../components/MemberCard';
import { Text, Input } from '../../components/Themed';
import { useRootNavigationState, useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../util/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type YourMemberType = {
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
export default function TabOneScreen() {
  const [session, setSession] = useState<Session | null>(null)
  const [members, setMembers] = useState<Array<YourMemberType> | null>(null);
  const [errors, setError] = useState<String | null>(null);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    if (!session && !rootNavigationState?.key) {
      router.push('/login');
    }
}, []);
  const handleSearch = async (value: string) => {
    let { data, error } = await supabase.rpc('search_members', {search_term:value})
    if (error) setError('No results found. Please try a different search term.');
    if (data) {
      setMembers(data);
      setError(null);
    }
    try {
      await AsyncStorage.setItem('searchResults', JSON.stringify(data));
    } catch (storageError) {
      console.error('Error storing search results in AsyncStorage:', storageError);
    }
  };
  const handleCardPress = (member: YourMemberType) => {
    router.replace(`/(modal)/${member.uuid}`);
  };

  const renderItem = ({ item }: { item: YourMemberType }) => {
    return (
      <Card 
      address={item.address}
      allergies={item.allergies}
      created_at={item.created_at}
      date_of_birth={item.date_of_birth}
      email={item.email}
      emergency_contact_name={item.emergency_contact_name}
      emergency_contact_phone={item.emergency_contact_phone}
      first_name={item.first_name}
      last_name={item.last_name}
      medical_conditions={item.medical_conditions}
      phone={item.phone}
      registration_date={item.registration_date}
      uuid={item.uuid}
      onPress={handleCardPress}
    />
    );
  };
  
  

  return (
    <View style={styles.container}
    >
      <Input
        lightColor="lightTextColor"
        darkColor="darkTextColor"
        placeholder="Search name..."
        onSearch={handleSearch}
      />
      {errors ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.memberList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  memberList: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    padding: 20,
    borderRadius: 10,
    marginTop: '30%',
    marginBottom: '34%',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
});
