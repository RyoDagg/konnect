import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import API from '../../services/api';
import { useStore } from '../../services/store';
import { NavigationProps } from '../../types/navigation';
import { Transaction } from '../../types/transaction';

import logo from '../../assets/logo.png';

const Transactions = () => {
  const navigation = useNavigation<NavigationProps>();
  const { setUser } = useStore();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { ok, data } = await API.get('/transaction');
        if (!ok) throw new Error('Error fetching transactions');

        setTransactions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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
      {/* Header */}
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

      {/* Title */}
      <Text className="text-3xl font-bold text-gray-800 mx-6 mt-6 mb-4">Transactions</Text>

      {/* Transactions List */}
      <ScrollView className="flex-1 mx-6">
        {loading ? (
          <View className="items-center justify-center py-6">
            <Text className="text-gray-500">Loading transactions...</Text>
          </View>
        ) : transactions.length === 0 ? (
          <View className="items-center justify-center py-6">
            <Text className="text-gray-500">No transactions found.</Text>
          </View>
        ) : (
          transactions.map(transaction => (
            <View
              key={transaction.id}
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm shadow-gray-200"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">
                  {transaction.type === 'send' ? 'Sent' : 'Requested'}
                </Text>
                <Text
                  className={`text-lg font-semibold ${
                    transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {transaction.type === 'send' ? '-' : '+'}
                  {transaction.amount.toFixed(3)} TND
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </Text>
                <View className="flex-row items-center">
                  <View
                    className={`w-2 h-2 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                  <Text className="text-sm text-gray-500 ml-2 capitalize">
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transactions;
