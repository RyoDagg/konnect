import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

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

        console.log(data);
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
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#6B7280" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Transaction not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-6">
      <View className="bg-white rounded-xl p-6 shadow-sm shadow-blue-950/70 mb-2">
        <Text className="text-lg font-semibold text-gray-500 mb-2">Transaction Type</Text>
        <View className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              transaction.type === 'send' ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <AntDesign
              name={transaction.type === 'send' ? 'arrowup' : 'arrowdown'}
              size={20}
              color={transaction.type === 'send' ? '#EF4444' : '#10B981'}
            />
          </View>
          <Text className="text-xl font-bold text-gray-800 ml-4">
            {transaction.type === 'send' ? 'Sent' : 'Requested'}
          </Text>
        </View>
      </View>

      <View className="bg-white rounded-xl p-6 shadow-sm shadow-blue-950/70 mb-2">
        <Text className="text-lg font-semibold text-gray-500 mb-2">Amount</Text>
        <Text
          className={`text-3xl font-bold ${
            transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {transaction.type === 'send' ? '-' : '+'}
          {transaction.amount.toFixed(3)} TND
        </Text>
      </View>

      <View className="bg-white rounded-xl p-6 shadow-sm shadow-blue-950/70 mb-2">
        <Text className="text-lg font-semibold text-gray-500 mb-2">Status</Text>
        <View className="flex-row items-center">
          <View
            className={`w-2 h-2 rounded-full ${
              transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
          <Text className="text-lg font-semibold text-gray-800 ml-2 capitalize">
            {transaction.status}
          </Text>
        </View>
      </View>

      <View className="bg-white rounded-xl p-6 shadow-sm shadow-blue-950/70 mb-2">
        <Text className="text-lg font-semibold text-gray-500 mb-2">Date</Text>
        <Text className="text-lg font-semibold text-gray-800">
          {new Date(transaction.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View className="bg-white rounded-xl p-6 shadow-sm shadow-blue-950/70">
        <Text className="text-lg font-semibold text-gray-500 mb-4">Parties Involved</Text>

        <View className="mb-4">
          <Text className="text-sm text-gray-500">Sender</Text>
          {transaction.sender ? (
            <>
              <Text className="text-lg font-semibold text-gray-800">
                {transaction.sender.username}
              </Text>
              <Text className="text-sm text-gray-500">{transaction.sender.email}</Text>
            </>
          ) : (
            <Text className="text-lg font-semibold text-gray-800">Unknown Sender</Text>
          )}
        </View>

        <View>
          <Text className="text-sm text-gray-500">Receiver</Text>
          {transaction.receiver ? (
            <>
              <Text className="text-lg font-semibold text-gray-800">
                {transaction.receiver.username}
              </Text>
              <Text className="text-sm text-gray-500">{transaction.receiver.email}</Text>
            </>
          ) : (
            <Text className="text-lg font-semibold text-gray-800">Unknown Receiver</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionDetails;
