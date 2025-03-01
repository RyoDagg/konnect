import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Cash from '../screens/cash';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cash" component={Cash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
