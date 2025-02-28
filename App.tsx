import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View className="items-center justify-center flex-1 bg-orange-50">
      <Text className="text-6xl font-bold text-gray-800">Hello App</Text>
      <StatusBar style="auto" />
      <TouchableOpacity className="bg-blue-500 p-4 rounded-md">
        <Text className="text-white">Button</Text>
      </TouchableOpacity>
    </View>
  );
}
