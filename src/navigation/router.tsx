import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Transactions from '../screens/transaction/list';
import TransactionDetails from '../screens/transaction/view';
import CashOut from '../screens/transaction/send';
import CashIn from '../screens/transaction/request';

import { useStore } from '../services/store';
import BottomTabs from '../components/BottomTabs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="TransactionDetails"
        options={{ title: 'Details' }}
        component={TransactionDetails}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const { user } = useStore();

  return <NavigationContainer>{user ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

export default Router;
