import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Transactions: undefined;
  TransactionDetails: { transactionId: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
