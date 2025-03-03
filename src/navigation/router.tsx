import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/home';
import Login from './auth/login';
import Register from './auth/register';
import { useStore } from '../services/store';
import Transactions from '../screens/transaction/list';
import TransactionDetails from '../screens/transaction/view';
import CashOut from '../screens/transaction/send';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen
        name="TransactionDetails"
        options={{ title: 'Details' }}
        component={TransactionDetails}
      />
      <Stack.Screen name="CashOut" options={{ title: 'Cash Out' }} component={CashOut} />
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
