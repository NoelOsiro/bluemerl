import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { supabase } from '../util/supabase';
import { Session } from '@supabase/supabase-js';
import Colors from '../constants/Colors';
import SeparatorLine from '../components/Separator';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return session ? <RootLayoutNav /> : <LoginScreen />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName='(tabs)'
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)/modal"
          options={{
            presentation: 'modal',
            title: 'Profile',
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: 'purple',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'SpaceMono'
          },
          headerTitleAlign: 'center',
          headerShadowVisible: true,
          }} />
        <Stack.Screen
          name="(modal)/[uuid]"
          options={{
            presentation: 'modal',
            title: 'Member Details',
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: 'purple',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'SpaceMono'
          },
            headerTitleAlign: 'center',
            headerRight: () => <SeparatorLine />,
            headerShadowVisible: true,
          }} />
        {/* Add more screens as needed */}
      </Stack>
    </ThemeProvider >
  );
}

function LoginScreen() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
