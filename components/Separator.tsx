import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SeparatorLine = () => {
  const { colors } = useTheme();

  return <View style={[styles.separator, { borderBottomColor: 'white' }]} />;
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 10,
  },
});

export default SeparatorLine;
