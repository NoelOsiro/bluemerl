import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import * as aesjs from 'aes-js';
import 'react-native-get-random-values';
import { Platform } from "react-native";



const supabaseUrl = 'https://evsvqaodnxyirbjlvruc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2c3ZxYW9kbnh5aXJiamx2cnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMzMxMzIsImV4cCI6MjAxMTYwOTEzMn0.TpcYJ_49rJy0G-P2qpHZSKztOMhHOaj9lFAjg7hqf64'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})