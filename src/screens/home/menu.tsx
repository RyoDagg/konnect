import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import API from '../../services/api';
import { useStore } from '../../services/store';

const Menu = () => {
  const { setUser } = useStore();

  const handleLogout = async () => {
    try {
      API.removeToken();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      id: '2',
      icon: <Feather name="settings" size={24} color="#162456" />,
      label: 'Settings',
      onPress: () => alert('Settings clicked'),
    },
    {
      id: '3',
      icon: <Ionicons name="person" size={24} color="#162456" />,
      label: 'Profile',
      onPress: () => alert('Profile clicked'),
    },
    {
      id: '4',
      icon: <Ionicons name="notifications" size={24} color="#162456" />,
      label: 'Notifications',
      onPress: () => alert('Notifications clicked'),
    },
    {
      id: '5',
      icon: <MaterialIcons name="help" size={24} color="#162456" />,
      label: 'Help',
      onPress: () => alert('Help clicked'),
    },
    {
      id: '6',
      icon: <AntDesign name="logout" size={24} color="#162456" />,
      label: 'Logout',
      onPress: handleLogout,
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="rounded-2xl bg-gray-50 p-0 shadow-sm space-y-1 shadow-gray-200">
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className="flex-row items-center p-4 border-b-2 border-gray-800 last:border-b-0"
          >
            <View className="w-8 h-8 items-center justify-center">{item.icon}</View>

            <Text className="text-lg font-semibold text-gray-800 ml-4">{item.label}</Text>

            <View className="ml-auto">
              <AntDesign name="right" size={20} color="#D1D5DB" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Menu;
