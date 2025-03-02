import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import logo from '../../assets/logo.png';
import API from '../../services/api';
import { NavigationProps } from '../../types/navigation';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/auth-login');
      console.log('user-login=>', data);
      // TODO: Save user data to store
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-6">
      <View className="items-center mb-6">
        <Image source={logo} className="w-24 h-24 rounded-lg" />
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-4">Login</Text>

      <TextInput
        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4"
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        className="w-full p-4 bg-white rounded-lg shadow-sm mb-6"
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-lg items-center mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" size={24} />
        ) : (
          <Text className="text-white text-lg font-bold">Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} className="items-center">
        <Text className="text-gray-500">
          Don't have an account? <Text className="text-blue-600 font-bold">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
