import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import API from '../../services/api';
import { useStore } from '../../services/store';
import { NavigationProps } from '../../types/navigation';

import linksImage from '../../assets/home/links.png';
import logo from '../../assets/logo.png';
import personalGraph from '../../assets/home/graph-personal.png';
import shopGraph from '../../assets/home/graph-shop.png';
import { useEffect, useState } from 'react';
import { Wallet } from '../../types/wallet';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const { setUser } = useStore();

  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { ok, data } = await API.get('/wallet');
        if (!ok) throw new Error('Error fetching wallet');

        setWallet(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWallet();
  }, []);

  const handleLogout = async () => {
    try {
      API.removeToken();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center mx-6 mt-6">
        <Image source={logo} className="w-12 h-12 rounded-lg" />
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/v2/C4E03AQEEZUPHzQoE0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623677348445?e=2147483647&v=beta&t=sqDxbsOL6qHX3U123nNUJ1EWY6noIQIEN7DuCRBtSos',
            }}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
        </TouchableOpacity>
      </View>

      <View className="rounded-2xl mx-6 mt-6 p-6 bg-blue-950 shadow-lg shadow-blue-950/50">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-xl font-semibold text-white">Cash Balance</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Transactions')}
            className="flex-row items-center"
          >
            <Text className="text-gray-200 text-sm">Account & Routing</Text>
            <Entypo name="chevron-right" size={16} color="#DADADA" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-baseline my-4">
          <Text className="text-4xl font-bold text-lime-400">
            {wallet ? Math.floor(wallet.balance) : '0'}
          </Text>
          <Text className="text-3xl font-bold text-lime-400">
            {wallet ? (wallet.balance % 1).toFixed(3).substring(1) : '.000'}
          </Text>
          <Text className="text-lime-500 text-lg font-medium"> TND</Text>
        </View>

        <View className="flex-row justify-between gap-4 mt-4">
          <TouchableOpacity className="flex-1 flex-row justify-center items-center gap-2 p-4 rounded-full bg-lime-900/20">
            <Text className="text-lime-300 text-lg font-semibold">Cash In</Text>
            <AntDesign name="login" size={16} color="#d8f999" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('CashOut')}
            className="flex-1 flex-row justify-center items-center gap-2 p-4 rounded-full bg-lime-900/20"
          >
            <Text className="text-lime-300 text-lg font-semibold">Cash Out</Text>
            <AntDesign name="logout" size={16} color="#d8f999" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row gap-4 mx-6 mt-6">
        <TouchableOpacity className="flex-1 rounded-2xl p-5 bg-white shadow shadow-blue-950/50">
          <View className="flex-row justify-between items-end">
            <Text className="text-xl font-semibold text-gray-800">Savings</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <View className="flex-row items-baseline mt-auto">
            <Text className="text-2xl font-bold text-gray-800">2530</Text>
            <Text className="text-xl font-bold text-gray-800">.450</Text>
            <Text className="text-gray-500 text-lg"> TND</Text>
          </View>

          <Text className="text-base text-gray-400 mt-2">Save for a goal</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 rounded-2xl p-5 bg-white shadow shadow-blue-950/50">
          <View className="flex-row justify-between items-end">
            <Text className="text-xl font-semibold text-gray-800">Shop Revenue</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <Image source={shopGraph} className="w-full my-2" resizeMode="contain" />

          <View className="flex-row items-center gap-1 mt-2">
            <AntDesign name="arrowup" size={18} color="#4ADE80" />
            <Text className="text-base text-gray-400">0.50% today</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 mx-6 mt-4">
        <TouchableOpacity className="flex-1 rounded-2xl p-5 bg-white shadow shadow-blue-950/50">
          <View className="flex-row justify-between items-end">
            <Text className="text-lg font-semibold text-gray-800">Personal Revenue</Text>
            <Entypo name="chevron-right" size={20} color="#DADADA" />
          </View>

          <Image source={personalGraph} className="w-full my-2" resizeMode="contain" />

          <View className="flex-row items-center gap-1 mt-2">
            <AntDesign name="arrowdown" size={18} color="#EF4444" />
            <Text className="text-base text-gray-400">0.80% today</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 rounded-2xl p-5 bg-white shadow shadow-blue-950/50">
          <View className="flex-row justify-between items-end">
            <Text className="text-xl font-semibold text-gray-800">Links</Text>
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
