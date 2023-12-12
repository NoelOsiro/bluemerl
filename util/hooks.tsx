// hooks.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ToastAndroid, View, Text } from 'react-native';
import { supabase } from './supabase';
import { useLocalSearchParams } from 'expo-router';
export interface YourMemberType {
    address: string;
    first_name: string;
    gender: string;
    last_name: string;
    member_uuid: string;
    phone: string;
    subscription_status: boolean;
  }


interface ModalScreenHooks {
  error: string | null;
  loading: boolean;
  item: YourMemberType | null;
  handleCheckIn: () => void;
  renderContent: () => React.ReactNode;
}

export const useModalScreen = (): ModalScreenHooks => {
  const { uuid } = useLocalSearchParams();
  const [item, setItem] = useState<YourMemberType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(uuid);
  }, [uuid]);

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const fetchData = async (uuid: string | string[]) => {
    setLoading(true);
    try {
      const { data: memberData, error: supabaseError } = await supabase.rpc('get_member_data', { uuid: uuid });
      if (supabaseError) {
        handleError(`Error fetching data: ${supabaseError.message}`);
      }

      if (memberData && memberData.length > 0) {
        const [firstMember] = memberData;
        setItem(firstMember);
      } else {
        handleError('No data found for the given member.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setItem(null);
  };

  const handleCheckIn = async () => {
    try {
      const checkinData = prepareCheckinData();

      const { data, error } = await supabase.from('checkins').upsert([checkinData]);

      if (error) {
        handleCheckinError('Failed to check in. Please try again.');
      } else {
        handleCheckinSuccess('Check-in successful.');
      }
    } catch (error) {
      handleCheckinError('An unexpected error occurred. Please try again.');
    }
  };

  const prepareCheckinData = () => {
    return {
      member_uuid: uuid,
      checkin_time: new Date(),
      location: 'Gymn',
      checkin_type: 'Manual',
    };
  };

  const handleCheckinSuccess = (message: string) => {
    if (Platform.OS === 'android') {
      showToast(`Success ${message}`);
    } else {
      Alert.alert('Success', message);
    }
  };

  const handleCheckinError = (errorMessage: string) => {
    if (Platform.OS === 'android') {
      showToast(`Error, ${errorMessage}`);
    } else {
      Alert.alert('Error', errorMessage);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <View>
          <Text>No data found for the given uuid.</Text>
        </View>
      );
    }
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      );
    }
    return null;
  };

  return { error, loading, item, handleCheckIn, renderContent };
};
