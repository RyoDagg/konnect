import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Cash: undefined;
  Login: undefined;
  Register: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
