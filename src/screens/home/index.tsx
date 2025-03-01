import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

import logo from '../../assets/logo.png';
import personalGraph from '../../assets/home/graph-personal.png';
import shopGraph from '../../assets/home/graph-shop.png';
import linksImage from '../../assets/home/links.png';

import { NavigationProps } from '../../types/navigation';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row justify-between items-center m-6">
        <Image source={logo} className="w-12 h-12 rounded-lg" />
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/v2/C4E03AQEEZUPHzQoE0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623677348445?e=2147483647&v=beta&t=sqDxbsOL6qHX3U123nNUJ1EWY6noIQIEN7DuCRBtSos',
          }}
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
      </View>

      <View className="bg-white rounded-xl shadow-sm mx-8 p-4 my-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-800">Cash Balance</Text>

          <TouchableOpacity className="flex-row">
            <Text className="text-gray-500">Account & Routing</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-baseline my-4">
          <Text className="text-4xl font-bold text-gray-700">1855</Text>
          <Text className="text-3xl font-bold text-gray-700">.350</Text>
          <Text className="text-gray-500"> TND</Text>
        </View>

        <View className="flex-row justify-between gap-6 items-center mt-4">
          <TouchableOpacity className="flex-1 flex-row justify-center items-center gap-2 p-4 rounded-full bg-gray-100">
            <Text className="text-gray-700 text-xl font-bold">Cash In</Text>
            <AntDesign name="login" size={18} color="#7a7a7a" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row justify-center items-center gap-2 p-4 rounded-full bg-gray-100">
            <Text className="text-gray-700 text-xl font-bold">Cash Out</Text>
            <AntDesign name="logout" size={18} color="#7a7a7a" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row gap-4 mx-8 my-3">
        <TouchableOpacity className="bg-white flex-1 rounded-xl shadow-sm p-3">
          <View className="flex-row justify-between items-end">
            <Text className="text-xl text-gray-700 font-bold">Savings</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <View className="flex-row items-baseline mt-auto">
            <Text className="text-2xl font-bold text-gray-700">2530</Text>
            <Text className="text-xl font-bold text-gray-700">.450</Text>
            <Text className="text-gray-500"> TND</Text>
          </View>

          <Text className="text-lg text-gray-400">Save for a goal</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white flex-1 rounded-xl shadow-sm p-3">
          <View className="flex-row justify-between items-end">
            <Text className="text-xl text-gray-700 font-bold">Shop Revenue</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <Image source={shopGraph} className="w-full my-2" resizeMode="contain" />

          <View className="flex-row items-center gap-1 mt-auto">
            <AntDesign name="arrowup" size={20} color="#7a7a7a" />
            <Text className="text-lg text-gray-400">0.50% today</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 mx-8 my-3">
        <TouchableOpacity className="bg-white flex-1 rounded-xl shadow-sm p-3">
          <View className="flex-row justify-between items-end">
            <Text className="text-lg text-gray-700 font-bold">Personal Revenue</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <Image source={personalGraph} className="w-full my-2" resizeMode="contain" />

          <View className="flex-row items-center gap-1 mt-auto">
            <AntDesign name="arrowup" size={20} color="#7a7a7a" />
            <Text className="text-lg text-gray-400">0.50% today</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white flex-1 rounded-xl shadow-sm p-3">
          <View className="flex-row justify-between items-end">
            <Text className="text-xl text-gray-700 font-bold">Links</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <View className="mt-auto">
            <Image source={linksImage} className="w-full" resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
