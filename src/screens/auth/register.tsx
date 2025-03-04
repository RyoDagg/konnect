import { useNavigation } from '@react-navigation/native';

import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProps } from '../../types/navigation';

import logo from '../../assets/logo.png';

const Register = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      <View className="items-center mb-8">
        <Image source={logo} className="w-24 h-24 rounded-lg" />
      </View>

      <Text className="text-3xl font-bold text-gray-800 mb-6">Create Account</Text>

      <TextInput
        className="w-full p-4 bg-white rounded-xl shadow-sm shadow-gray-400 mb-4 border border-gray-200 text-gray-800"
        placeholder="Full Name"
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        className="w-full p-4 bg-white rounded-xl shadow-sm shadow-gray-400 mb-4 border border-gray-200 text-gray-800"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
      />

      <TextInput
        className="w-full p-4 bg-white rounded-xl shadow-sm shadow-gray-400 mb-6 border border-gray-200 text-gray-800"
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />

      <TouchableOpacity className="bg-green-600 p-4 rounded-xl shadow-sm shadow-green-600/30 items-center mb-4">
        <Text className="text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} className="items-center">
        <Text className="text-gray-500 text-base">
          Already have an account? <Text className="text-green-600 font-semibold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
