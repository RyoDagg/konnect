import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { User } from '../../types/userTypes';

const CashOutScreen = () => {
  const [amount, setAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Dummy contact data (10 contacts)
  const contacts = [
    { id: '1', username: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', username: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', username: 'Charlie Brown', email: 'charlie@example.com' },
    { id: '4', username: 'Diana Evans', email: 'diana@example.com' },
    { id: '5', username: 'Eva Green', email: 'eva@example.com' },
    { id: '6', username: 'Frank White', email: 'frank@example.com' },
    { id: '7', username: 'Grace Lee', email: 'grace@example.com' },
    { id: '8', username: 'Henry Brown', email: 'henry@example.com' },
    { id: '9', username: 'Ivy Taylor', email: 'ivy@example.com' },
    { id: '10', username: 'Jack Wilson', email: 'jack@example.com' },
  ];

  const handleNumberPress = (value: string) => {
    if (value === '000') {
      setAmount(prev => prev + '000');
    } else {
      setAmount(prev => prev + value);
    }
  };

  const handleBackspace = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleContactSelect = (contact: User) => {
    setSelectedContact(contact);
  };

  const handleSendMoney = () => {
    if (!selectedContact || !amount) return alert('Please select a contact and enter an amount.');

    alert(`Sent ${amount} TND to ${selectedContact.username}`);
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-2xl p-6 shadow shadow-blue-950/70 mb-6">
        <Text className="text-lg font-semibold text-gray-500 mb-2">Amount (TND)</Text>
        <TouchableOpacity onPress={() => setIsKeyboardVisible(true)}>
          <View className="flex-row items-center justify-between p-4 bg-gray-100 rounded-lg">
            <Text className="text-2xl font-bold text-blue-950">
              {amount ? `${amount} TND` : 'Enter amount'}
            </Text>
            <Feather name="edit" size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-6 bg-white rounded-2xl  shadow shadow-blue-950/70 mb-6">
        <Text className="text-lg font-semibold text-gray-500 mb-2">Send To</Text>
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleContactSelect(item)}
              className={`p-4 rounded-lg ${
                selectedContact?.id === item.id ? 'bg-blue-500/20' : 'bg-gray-50'
              }`}
            >
              <Text className="text-lg font-semibold text-gray-800">{item.username}</Text>
              <Text className="text-sm text-gray-500">{item.email}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>

      <TouchableOpacity
        onPress={handleSendMoney}
        className="bg-blue-800 p-4 rounded-xl shadow-sm shadow-blue-600/30 items-center"
      >
        <Text className="text-white text-lg font-semibold">Send Money</Text>
      </TouchableOpacity>

      {isKeyboardVisible && (
        <View className="absolute bottom-0 left-0 right-0 bg-white py-6 px-12 shadow-lg shadow-gray-400">
          <View className="flex-row justify-between mb-4">
            {['1', '2', '3'].map(num => (
              <TouchableOpacity
                key={num}
                onPress={() => handleNumberPress(num)}
                className="w-24 h-16 bg-white/80 rounded-full items-center justify-center shadow-sm shadow-blue-800/70"
              >
                <Text className="text-2xl font-bold text-gray-800">{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between mb-4">
            {['4', '5', '6'].map(num => (
              <TouchableOpacity
                key={num}
                onPress={() => handleNumberPress(num)}
                className="w-24 h-16 bg-white/80 rounded-full items-center justify-center shadow-sm shadow-blue-800/70"
              >
                <Text className="text-2xl font-bold text-gray-800">{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between mb-4">
            {['7', '8', '9'].map(num => (
              <TouchableOpacity
                key={num}
                onPress={() => handleNumberPress(num)}
                className="w-24 h-16 bg-white/80 rounded-full items-center justify-center shadow-sm shadow-blue-800/70"
              >
                <Text className="text-2xl font-bold text-gray-800">{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => handleNumberPress('000')}
              className="w-24 h-16 bg-white/80 rounded-full items-center justify-center shadow-sm shadow-blue-800/70"
            >
              <Text className="text-2xl font-bold text-gray-800">000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNumberPress('0')}
              className="w-24 h-16 bg-white/80 rounded-full items-center justify-center shadow-sm shadow-blue-800/70"
            >
              <Text className="text-2xl font-bold text-gray-800">0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBackspace}
              className="w-24 h-16 bg-white/80 rounded-full items-center justify-center shadow-sm shadow-red-800"
            >
              <Feather name="delete" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setIsKeyboardVisible(false)}
            className="mt-6 bg-blue-800 p-4 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-semibold">Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CashOutScreen;
