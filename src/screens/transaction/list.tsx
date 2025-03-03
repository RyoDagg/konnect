import { useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import API from '../../services/api';
import { useStore } from '../../services/store';
import { NavigationProps } from '../../types/navigation';
import { Transaction } from '../../types/transaction';

import { Wallet } from '../../types/wallet';

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletResponse = await API.get('/wallet');
        if (!walletResponse.ok) throw new Error('Error fetching wallet');
        setWallet(walletResponse.data);

        const transactionsResponse = await API.get('/transaction');
        if (!transactionsResponse.ok) throw new Error('Error fetching transactions');
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="rounded-2xl mx-6 mt-6 p-4 bg-blue-950 shadow-lg shadow-blue-950/50">
        <Text className="text-xl font-semibold text-gray-200">Cash Balance</Text>
        <View className="flex-row items-baseline my-2">
          <Text className="text-4xl font-bold text-lime-400">
            {wallet ? Math.floor(wallet.balance) : '0'}
          </Text>
          <Text className="text-3xl font-bold text-lime-400">
            {wallet ? (wallet.balance % 1).toFixed(3).substring(1) : '.000'}
          </Text>
          <Text className="text-lime-500 text-lg font-medium"> TND</Text>
        </View>
      </View>

      <Text className="text-3xl font-bold text-gray-800 mx-6 mt-6 mb-4">Transactions</Text>

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
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('TransactionDetails', { transactionId: transaction.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm shadow-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-blue-950">
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
            <Text className="text-sm text-gray-500 ml-2 capitalize">{transaction.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Transactions;
