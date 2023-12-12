// ModalScreen.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { useModalScreen } from '../../util/hooks';
import MemberDetails from '../../components/MemberDetails';


export default function ModalScreen() {
  const { error, loading, item, handleCheckIn, renderContent } = useModalScreen();

  return (
    <View style={styles.container}>
      {renderContent()}
      {item && <MemberDetails item={item} handleCheckIn={handleCheckIn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
