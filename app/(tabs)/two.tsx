import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Vibration, TouchableOpacity } from 'react-native';
import { supabase } from '../../util/supabase';
import { BarCodeScannerResult } from 'expo-barcode-scanner';
import BarCodeScannerComponent from '../../components/BarcodeScanner';
import ScanResultComponent from '../../components/ScanResult';
import { Text } from '../../components/Themed';

interface YourMemberType {
  address: string;
  first_name: string;
  gender: string;
  last_name: string;
  member_uuid: string;
  phone: string;
  subscription_status: boolean;
}

const TabTwoScreen: React.FC = () => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [member, setMember] = useState<YourMemberType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBarCodeScanned = async ({ type, data }: BarCodeScannerResult) => {
    if (scanning) {
      setScanning(false);
      setResult(data as string);
      Vibration.vibrate();
      setLoading(true);
      try {
        // Validate UUID format
        if (!isValidUUID(data)) {
          setError('Invalid UUID format');
          setResult(null);
          setScanning(true); // Set scanning to true to show the barcode scanner again
          return;
        }
  
        const { data: memberData, error: supabaseError } = await supabase.rpc('get_member_data', { uuid: data });
  
        if (supabaseError) {
          setError('Error fetching data. Please try again.');
          console.error(supabaseError); // Log the actual error
          setResult(null);
        }
  
        if (memberData && memberData.length > 0) {
          const [firstMember] = memberData;
          setMember(firstMember);
          console.log(firstMember);
        } else {
          setError('No data found for the given UUID. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };
  
  // UUID validation function
  const isValidUUID = (uuid: string): boolean => {
    // Make the regex case-insensitive
    const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
    const isValid = uuidRegex.test(uuid);
    console.log('UUID Validation Result:', isValid);
    return isValid;
  };

  const handleScanAgain = () => {
    setScanning(true);
    setResult(null);
    setError(null);
    setMember(null);
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      setScanning(true); // Reset scanning state when component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      {scanning ? (
        <BarCodeScannerComponent onScan={handleBarCodeScanned} />
      ) : (
        <>
          {loading && (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          {member && !error && (
            <ScanResultComponent
              result={result}
              loading={loading}
              onScanAgain={handleScanAgain}
              member={member}
            />
          )}
          {error && (
            <View>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={handleScanAgain} style={styles.scanAgainButton}>
                <Text style={styles.scanAgainButtonText}>Scan Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TabTwoScreen;
