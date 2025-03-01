import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Cash: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
