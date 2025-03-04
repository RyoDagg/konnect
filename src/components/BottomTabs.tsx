import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import CashIn from '../screens/transaction/request';
import Transactions from '../screens/transaction/list';
import CashOut from '../screens/transaction/send';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const iconMap = {
  Home: 'home',
  Transactions: 'time',
  CashOut: 'arrow-up',
  CashIn: 'arrow-down',
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused
            ? iconMap[route.name as keyof typeof iconMap]
            : `${iconMap[route.name as keyof typeof iconMap]}-outline`;
          return (
            <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#162456',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          elevation: 5,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="CashOut" options={{ title: 'Cash Out' }} component={CashOut} />
      <Tab.Screen name="CashIn" options={{ title: 'Cash In' }} component={CashIn} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
