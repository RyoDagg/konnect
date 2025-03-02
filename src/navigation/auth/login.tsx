import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import Icon from '@expo/vector-icons/Ionicons';

import API from '../../services/api';
import { NavigationProps } from '../../types/navigation';
import { useStore } from '../../services/store';

import logo from '../../assets/logo.png';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(__DEV__ ? 'alice@example.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'password123' : '');
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useStore();
  const navigation = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { ok, user, token } = await API.post('/user/login', { email, password });
      if (!ok) throw new Error('Invalid credentials');

      API.setToken(token);
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      <View className="items-center mb-8">
        <Image source={logo} className="w-24 h-24 rounded-lg" />
      </View>

      <Text className="text-3xl font-bold text-gray-800 mb-6">Login</Text>

      <TextInput
        className="w-full p-4 bg-white rounded-xl shadow-sm shadow-gray-400 border border-gray-200 mb-4 text-gray-800"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View className="w-full bg-white rounded-xl shadow-sm shadow-gray-400 border border-gray-200 mb-6 flex-row items-center">
        <TextInput
          className="flex-1 p-4 text-gray-800"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="px-4">
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-xl shadow-sm shadow-blue-600/30 items-center mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" size={24} />
        ) : (
          <Text className="text-white text-lg font-semibold">Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} className="items-center">
        <Text className="text-gray-500 text-base">
          Don't have an account? <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
