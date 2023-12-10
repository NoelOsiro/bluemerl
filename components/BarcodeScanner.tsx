import React, { useState, useEffect } from 'react';
import { BarCodeScannerResult, BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import { Text } from './Themed';
import Colors from '../constants/Colors';

interface BarCodeScannerComponentProps {
  onScan: (result: BarCodeScannerResult) => void;
}

const BarCodeScannerComponent: React.FC<BarCodeScannerComponentProps> = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // check permissions
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text style={styles.cameraRequest}>Requesting camera permission</Text>;
  }

  if (!hasPermission) {
    return <Text style={styles.camError}>No access to camera. Please enable camera permissions in your device settings.</Text>;
  }

  return <BarCodeScanner onBarCodeScanned={onScan} style={{ flex: 1 }} />;
};

const styles = StyleSheet.create({
  cameraRequest: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  camError: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default BarCodeScannerComponent;
