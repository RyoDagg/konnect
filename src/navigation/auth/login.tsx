import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import Icon from '@expo/vector-icons/Ionicons';

import API from '../../services/api';

import logo from '../../assets/logo.png';

import { NavigationProps } from '../../types/navigation';
import { useStore } from '../../services/store';

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

      API.setToken(`Bearer ${token}`);
      setUser(user);
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
        value={email}
        onChangeText={setEmail}
      />
      <View className="w-full bg-white rounded-lg shadow-sm mb-6 flex-row items-center">
        <TextInput
          className="flex-1 p-4"
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="px-4">
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

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
