import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import './global.css';

import Router from './src/navigation/router';
import API from './src/services/api';

import { useStore } from './src/services/store';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { setUser } = useStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await API.get('/auth-me');
        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size={52} color="#3b3baf" />
      </View>
    );
  }

  return (
    <>
      <Router />
      <StatusBar style="auto" />
    </>
  );
}
