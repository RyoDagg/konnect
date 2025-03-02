import { useNavigation } from '@react-navigation/native';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logo from '../../assets/logo.png';
import { NavigationProps } from '../../types/navigation';

const Register = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-6">
      <View className="items-center mb-6">
        <Image source={logo} className="w-24 h-24 rounded-lg" />
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-4">Register</Text>

      <TextInput
        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4"
        placeholder="Full Name"
      />
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

      <TouchableOpacity className="bg-green-600 p-4 rounded-lg items-center mb-4">
        <Text className="text-white text-lg font-bold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} className="items-center">
        <Text className="text-gray-500">
          Already have an account? <Text className="text-green-600 font-bold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
