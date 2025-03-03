import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';

import API from '../../services/api';
import { Transaction } from '../../types/transaction';

type RouteParams = {
  params: {
    transactionId: string;
  };
};

const TransactionDetails = () => {
  const route = useRoute<RouteProp<RouteParams>>();

  const { transactionId } = route.params;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { ok, data } = await API.get(`/transaction/${transactionId}`);
        if (!ok) throw new Error('Error fetching transaction details');

        setTransaction(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#6B7280" />
      </SafeAreaView>
    );
  }

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Transaction not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm shadow-gray-200">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Transaction Details</Text>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Type</Text>
          <Text className="text-gray-600">
            {transaction.type === 'send' ? 'Sent' : 'Requested'}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Amount</Text>
          <Text
            className={`text-xl font-bold ${
              transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {transaction.type === 'send' ? '-' : '+'}
            {transaction.amount.toFixed(3)} TND
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Status</Text>
          <View className="flex-row items-center">
            <View
              className={`w-2 h-2 rounded-full ${
                transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
              }`}
            />
            <Text className="text-gray-600 ml-2 capitalize">{transaction.status}</Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Date</Text>
          <Text className="text-gray-600">
            {new Date(transaction.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Sender ID</Text>
          <Text className="text-gray-600">{transaction.senderId}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Receiver ID</Text>
          <Text className="text-gray-600">{transaction.receiverId}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;
