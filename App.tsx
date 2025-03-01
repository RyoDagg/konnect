import React from 'react';
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import Router from './src/navigation/router';

export default function App() {
  return (
    <>
      <Router />
      <StatusBar style="auto" />
    </>
  );
}
