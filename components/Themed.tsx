import React from 'react';
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  TextInput as DefaultInput,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type InputProps = ThemeProps & DefaultInput['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Input(props: InputProps & { onSearch: (value: string) => void }) {
  const { style, lightColor, darkColor, onSearch, ...otherProps } = props;
  const [inputValue, setInputValue] = React.useState('');

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Apply the color style to the input text color
  const inputStyle: ViewStyle = {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: '100%',
  };

  // Style for the icon
  const iconStyle: ViewStyle = {
    marginRight: 10,
    backgroundColor: 'purple',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  };

  const handleSearch = () => {
    // Trigger the onSearch callback with the current input value
    onSearch(inputValue);
  };

  return (
    <DefaultView style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, justifyContent: 'center' }}>
      <DefaultView style={inputStyle as any}>
        <DefaultInput
          style={{ flex: 1, paddingVertical: 10 }}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          {...otherProps}
        />
      </DefaultView>
      <TouchableOpacity style={iconStyle} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </DefaultView>
  );
}
